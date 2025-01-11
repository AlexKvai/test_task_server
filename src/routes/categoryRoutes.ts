import { Router } from 'express'
import { createCategory } from '../controllers/CategoryController'
const router = Router()

// Пример маршрута для получения категорий
router.post('/create', createCategory)

export default router
