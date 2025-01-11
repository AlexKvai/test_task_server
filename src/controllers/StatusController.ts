import { Request, Response } from 'express'
import prisma from '../prismaClient'

const createStatus = async (req: Request, res: Response) => {
	try {
		const { name } = req.body

		// Проверяем, существует ли уже статус с таким именем
		const existingStatus = await prisma.status.findUnique({
			where: { name }, // Уникальное поле для поиска
		})

		if (existingStatus) {
			return res.status(400).json({ message: 'Status already exists' })
		}

		// Создание статуса, если нет дублирующейся записи
		const status = await prisma.status.create({
			data: { name },
		})

		res.status(201).json(status)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error })
	}
}

export { createStatus }
