import { Router } from 'express'
import {
	createFeedback,
	deleteFeedback,
	getAllFeedbacks,
	updateFeedback,
} from '../controllers/FeedbackController'

// Middleware для аутентификации
import authenticate from '../middlewares/authenticate'

const router = Router()

// Пример маршрута для получения всех фидбэков
router.get('/', getAllFeedbacks)

// Пример маршрута для создания нового фидбэка, с аутентификацией
router.post('/', authenticate, createFeedback)

// Пример маршрута для обновления фидбэка, с аутентификацией
router.put('/:id', authenticate, updateFeedback)

// Пример маршрута для удаления фидбэка, с аутентификацией
router.delete('/:id', authenticate, deleteFeedback)

export default router
