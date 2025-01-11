import { Request, Response } from 'express'
import prisma from '../prismaClient'

const getCategoryById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		const category = await prisma.category.findUnique({
			where: { id: parseInt(id, 10) },
			select: {
				id: true,
				name: true,
			},
		})

		if (!category) {
			return res.status(404).json({ message: 'Category not found' })
		}

		res.status(200).json(category)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error })
	}
}

const getAllCategories = async (req: Request, res: Response) => {
	try {
		const categories = await prisma.category.findMany({
			select: {
				id: true,
				name: true,
			},
		})

		res.status(200).json(categories)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error })
	}
}

const createCategory = async (req: Request, res: Response) => {
	try {
		const { name } = req.body

		// Проверяем, есть ли уже такая категория в базе
		const existingCategory = await prisma.category.findUnique({
			where: { name }, // Уникальное поле для поиска
		})

		if (existingCategory) {
			return res.status(400).json({ message: 'Category already exists' })
		}

		// Создание категории, если нет дублирующейся записи
		const category = await prisma.category.create({
			data: { name },
		})

		res.status(201).json(category)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error })
	}
}

export { createCategory, getAllCategories, getCategoryById }
