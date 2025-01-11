import { Router } from 'express'
import {
	createStatus,
	getAllStatuses,
	getStatusById,
} from '../controllers/StatusController'

const router = Router()

// Пример маршрута для получения статусов
router.post('/create', createStatus)

router.get('/:id', getStatusById)

router.get('/', getAllStatuses)

export default router
