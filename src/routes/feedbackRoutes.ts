import { Router } from 'express'

const router = Router()

// Пример маршрута для CRUD операций с фидбэками
router.get('/', (req, res) => {
	res.send('Get all feedback posts')
})

export default router
