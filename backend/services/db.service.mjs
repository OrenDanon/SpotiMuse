import mongoDB from 'mongodb'
import { config } from '../config/index.mjs'
import { logger } from './logger.service.mjs'
const { MongoClient } = mongoDB


export const dbService = {
    getCollection
}


let dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(config.dbName)
        dbConn = db
        logger.info('Connected successfully to DB')
        return db
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}




