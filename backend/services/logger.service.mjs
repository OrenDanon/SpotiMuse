import fs from 'fs'
// import { asyncLocalStorage } from './als.service.mjs'


const logsDir = './logs'
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir)
}

//define the time format
function getTime() {
    let now = new Date()
    return now.toLocaleString('he')
}

function isError(err) {
    return err && err.stack && err.message
}

function doLog(level, ...args) {

    const strs = args.map(arg =>
        (typeof arg === 'string' || isError(arg)) ? arg : JSON.stringify(arg)
    )

    let line = strs.join(' | ')
    // const store = asyncLocalStorage.getStore()
    // const userId = store?.loggedinUser?._id
    // const str = userId ? `(userId: ${userId})` : ''
    const str = "logger"
    line = `${getTime()} - ${level} - ${line} ${str}\n`
    console.log(line)
    fs.appendFile(`${logsDir}/backend.log`, line, (err) => {
        if (err) console.log('FATAL: cannot write to log file', err)
    })
}

export const logger = {
    debug(...args) {
        if (process.env.NODE_NEV === 'production') return
        doLog('DEBUG', ...args)
    },
    info(...args) {
        doLog('INFO', ...args)
    },
    warn(...args) {
        doLog('WARN', ...args)
    },
    error(...args) {
        doLog('ERROR', ...args)
    }
}