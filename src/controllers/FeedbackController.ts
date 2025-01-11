import { Request, Response } from 'express'
import prisma from '../prismaClient'

// #TODO Добавил тип any
const createFeedback = async (req: any, res: Response) => {
	try {
		const { title, description, categoryId, statusId } = req.body
		const userId = req.user.id // Получение ID из JWT токена

		// Создание фидбека и привязка к автору через relation с моделью User
		const feedback = await prisma.feedback.create({
			data: {
				title,
				description,
				categoryId,
				statusId,
				authorId: userId,
			},
		})

		res.status(201).json(feedback)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error })
	}
}

const getAllFeedbacks = async (req: Request, res: Response) => {
	try {
		const { category, status, sort, sortType, page = 1, limit = 10 } = req.query

		// Фильтры
		const filters: any = {}
		if (category) filters.categoryId = Number(category)
		if (status) filters.statusId = Number(status)

		// Пропуск и лимит для пагинации
		const skip = (Number(page) - 1) * Number(limit)

		// Сортировка
		let orderBy: any = {}
		if (sort) {
			if (typeof sort !== 'string') throw new Error('Sort must be a string')
			const sortFields = sort.split(',') // Разделение по запятой
			orderBy = sortFields.map((field: string) => ({
				[field]: sortType === 'desc' ? 'desc' : 'asc', // направление сортировки
			}))
		} else {
			orderBy = { createdAt: 'desc' } // по умолчанию сортировка по дате создания
		}

		// Запрос к базе данных
		const feedbacks = await prisma.feedback.findMany({
			where: filters,
			skip,
			take: Number(limit),
			orderBy,
			select: {
				id: true,
				title: true,
				description: true,
				category: {
					select: { name: true },
				},
				status: {
					select: { name: true },
				},
				votesCount: true,
				createdAt: true,
			},
		})

		res.json(feedbacks)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error })
	}
}

const updateFeedback = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const { title, description, categoryId, statusId } = req.body

		const feedback = await prisma.feedback.update({
			where: { id: Number(id) },
			data: { title, description, categoryId, statusId },
		})

		res.json(feedback)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error })
	}
}

const deleteFeedback = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		await prisma.feedback.delete({ where: { id: Number(id) } })

		res.status(204).send()
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error })
	}
}

export { createFeedback, deleteFeedback, getAllFeedbacks, updateFeedback }
