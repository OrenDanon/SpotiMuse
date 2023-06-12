import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { utilService } from '../../services/util.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

// const PAGE_SIZE = 3

const COLLECTION = 'station'


async function query(filterBy = { txt: '' }) {
    try {
        // const criteria = {}
        const collection = await dbService.getCollection(COLLECTION)
        const stations = await collection.find().toArray()
        // var carCursor = await collection.find(criteria)

        // if (filterBy.pageIdx !== undefined) {
        //     carCursor.skip(filterBy.pageIdx * PAGE_SIZE).limit(PAGE_SIZE)
        // }

        return stations
    } catch (err) {
        logger.error('cannot find stations', err)
        throw err
    }
}

async function getById(stationId) {
    try {
        const collection = await dbService.getCollection(COLLECTION)
        const station = collection.findOne({ _id: ObjectId(stationId) })
        return station
    } catch (err) {
        logger.error(`while finding station ${stationId}`, err)
        throw err
    }
}

async function remove(stationId) {
    try {
        const collection = await dbService.getCollection(COLLECTION)
        await collection.deleteOne({ _id: ObjectId(stationId) })
        return stationId
    } catch (err) {
        logger.error(`cannot remove station ${stationId}`, err)
        throw err
    }
}

async function add(station) {
    try {
        const collection = await dbService.getCollection(COLLECTION)
        await collection.insertOne(station)
        return station
    } catch (err) {
        logger.error('cannot insert station', err)
        throw err
    }
}

async function update(station) {
    try {
        const stationToSave = {
            name: station.name,
            songs: station.songs,
            imgUrl: station.imgUrl,
            tags: station.tags
        }
        const collection = await dbService.getCollection(COLLECTION)
        await collection.updateOne({ _id: ObjectId(station._id) }, { $set: stationToSave })
        const updatedStation = await collection.findOne({ _id: ObjectId(station._id) })
        return updatedStation
    } catch (err) {
        logger.error(`cannot update station ${carId}`, err)
        throw err
    }
}


export const stationService = {
    query,
    getById,
    add,
    update,
    remove,
}
