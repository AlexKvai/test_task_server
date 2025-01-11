import { Router } from 'express'

const router = Router()

// Пример маршрута для регистрации пользователя
router.post('/register', (req, res) => {
	res.send('Register a new user')
})

export default router
