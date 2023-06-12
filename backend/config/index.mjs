import configProd from './prod.mjs'
import configDev from './dev.mjs'


export let config

config = process.env.NODE_ENV === 'production' ? configProd : configDev

config.isGuestMode = true
