import { Router } from 'express'
import { createUpvote } from '../controllers/UpvoteController'

import authenticate from '../middlewares/authenticate'

const router = Router()

// Пример маршрута для получения статусов
router.post('/:feedbackId', authenticate, createUpvote)

export default router
