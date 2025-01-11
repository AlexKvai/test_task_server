import { Router } from 'express'

const router = Router()

// Пример маршрута для получения категорий
router.get('/', (req, res) => {
	res.send('Get all categories')
})

export default router
