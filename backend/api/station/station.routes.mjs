import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.mjs'
import { log } from '../../middlewares/logger.middleware.mjs'
import { getStations, getById, addStation, updateStation, removeStation } from './station.controller.mjs'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', log, getStations)
router.get('/:id', getById)
router.post('/', addStation)
router.put('/:id', updateStation)
router.delete('/:id', removeStation)


export const stationRoutes = router
