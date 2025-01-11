import { Request, Response } from 'express'
import prisma from '../prismaClient'

const createCategory = async (req: Request, res: Response) => {
	try {
		const { name } = req.body

		const category = await prisma.category.create({
			data: { name },
		})

		res.status(201).json(category)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error })
	}
}

export { createCategory }
