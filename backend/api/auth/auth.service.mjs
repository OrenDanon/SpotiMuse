import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'

import { userService } from '../user/user.service.mjs'
import { logger } from '../../services/logger.service.mjs'

const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

export const authService = {
    signup,
    login,
    getLoginToken,
    validateToken
}

async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username} ${password}`)

    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject('Invalid username or password')
    // TODO: un-comment for real login
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')

    delete user.password
    user._id = user._id.toString()
    return user
}

async function signup({ username, password, imgUrl,stations }) {
    const saltRounds = 10
    logger.info(`auth.service - signup with username: ${username} ${password}`)
    logger.debug(`auth.service - signup with username: ${username}`)
    if (!username || !password) return Promise.reject('Missing required signup information')

    const userExist = await userService.getByUsername(username)
    if (userExist) return Promise.reject('Username already taken')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ username, password: hash, imgUrl, stations})
}

function getLoginToken(user) {
    const userInfo = { _id: user._id, isAdmin: user.isAdmin }
    return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser

    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}

// ;(async ()=>{
//     await signup('bubu', '123', 'Bubu Bi')
//     await signup('mumu', '123', 'Mumu Maha')
// })()