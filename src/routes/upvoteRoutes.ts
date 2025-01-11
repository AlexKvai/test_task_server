import { Router } from 'express'

const router = Router()

// Пример маршрута для голосования
router.post('/:feedbackId', (req, res) => {
	res.send(`Upvote feedback with ID ${req.params.feedbackId}`)
})

export default router
