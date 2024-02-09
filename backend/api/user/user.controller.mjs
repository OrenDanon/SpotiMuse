import { userService } from './user.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { socketService } from '../../services/socket.service.mjs'

export async function getUsers(req, res) {
    try {
        logger.info('Trying to get USERS')
        const filterBy = {
            // txt: req.query?.txt || '',
        }
        const users = await userService.query()
        res.send(users)
    } catch (err) {
        logger.error('Failed to get users', err)
        res.status(400).send({ err: 'Failed to get users' })
    }
}

export async function getUser(req, res) {
    try {
        logger.info('id:', req.params.id)
        const user = await userService.getById(req.params.id)
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
        res.status(400).send({ err: 'Failed to get user' })
    }
}

export async function deleteUser(req, res) {
    try {
        await userService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete user', err)
        res.status(400).send({ err: 'Failed to delete user' })
    }
}

export async function updateUser(req, res) {
    try {
        const user = req.body
        const savedUser = await userService.update(user)
        res.send(savedUser)
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(400).send({ err: 'Failed to update user' })
    }
}
