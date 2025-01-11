import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient'

const registerUser = async (req: Request, res: Response) => {
	try {
		const { email, password, avatar } = req.body

		const existingUser = await prisma.user.findUnique({ where: { email } })
		if (existingUser)
			return res.status(400).json({ message: 'User already exists' })

		const hashedPassword = await bcrypt.hash(password, 10)
		const user = await prisma.user.create({
			data: { email, password: hashedPassword, avatar },
		})

		res.status(201).json(user)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error })
	}
}

const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body

		const user = await prisma.user.findUnique({ where: { email } })
		if (!user) return res.status(400).json({ message: 'Invalid credentials' })

		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid)
			return res.status(400).json({ message: 'Invalid credentials' })

		const token = jwt.sign(
			{ id: user.id },
			process.env.JWT_SECRET || 'secret',
			{
				expiresIn: '1h',
			}
		)

		res.json({ token })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error })
	}
}

// #TODO Добавил any для дальнейшей разработки
const getUserProfile = async (req: any, res: Response) => {
	try {
		const userId = req.user.id
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { id: true, email: true, avatar: true },
		})
		if (!user) return res.status(404).json({ message: 'User not found' })

		res.json(user)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error })
	}
}

export { getUserProfile, loginUser, registerUser }
