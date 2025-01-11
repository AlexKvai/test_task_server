import { Response } from 'express'
import prisma from '../prismaClient'

const createUpvote = async (req: any, res: Response) => {
	try {
		const feedbackId = parseInt(req.params.feedbackId)
		const userId = req.user.id // Получение ID из JWT токена

		console.log(feedbackId)
		// Проверяем существование фидбека по ID
		const feedback = await prisma.feedback.findUnique({
			where: { id: feedbackId },
		})

		if (!feedback) {
			return res.status(404).json({ message: 'Feedback not found' })
		}

		// Проверяем, существует ли уже upvote от этого пользователя для данного фидбека
		const existingUpvote = await prisma.upvote.findFirst({
			where: { feedbackId, userId },
		})

		if (existingUpvote) {
			return res
				.status(400)
				.json({ message: 'You have already upvoted this feedback' })
		}

		// Создание upvote
		const upvote = await prisma.upvote.create({
			data: {
				feedback: { connect: { id: feedbackId } },
				user: { connect: { id: userId } },
			},
		})

		res.status(201).json(upvote)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error })
	}
}

export { createUpvote }
