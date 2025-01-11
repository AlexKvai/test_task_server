import express from 'express'
import {
	getUserProfile,
	loginUser,
	registerUser,
} from '../controllers/UserController'

const router = express.Router()

// Register User Route
router.post('/register', registerUser)

// Login User Route
router.post('/login', loginUser)

// Get User Profile Route
router.get('/profile', getUserProfile)

export default router
