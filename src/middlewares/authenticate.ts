import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'

const authenticate = (req: any, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]
		if (!token) return res.status(401).json({ message: 'Unauthorized' })

		const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret')
		req.user = decoded // Записываем информацию о пользователе в req.user

		next()
	} catch (error) {
		res.status(401).json({ message: 'Invalid token', error })
	}
}

export default authenticate
