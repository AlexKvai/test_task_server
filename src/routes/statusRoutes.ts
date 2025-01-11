import { Router } from 'express'

const router = Router()

// Пример маршрута для получения статусов
router.get('/', (req, res) => {
	res.send('Get all statuses')
})

export default router
