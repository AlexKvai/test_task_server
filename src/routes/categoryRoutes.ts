import { Router } from 'express'
import {
	createCategory,
	getAllCategories,
	getCategoryById,
} from '../controllers/CategoryController'
const router = Router()

// Пример маршрута для получения категорий
router.post('/create', createCategory)

router.get('/:id', getCategoryById)

router.get('/', getAllCategories)

export default router
