import { Router } from 'express'
import { createStatus } from '../controllers/StatusController'

const router = Router()

// Пример маршрута для получения статусов
router.post('/create', createStatus)

export default router
