import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'
import categoryRoutes from './routes/categoryRoutes'
import feedbackRoutes from './routes/feedbackRoutes'
import statusRoutes from './routes/statusRoutes'
import upvoteRoutes from './routes/upvoteRoutes'
import userRoutes from './routes/userRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/feedbacks', feedbackRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/statuses', statusRoutes)
app.use('/api/upvotes', upvoteRoutes)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
