import express from 'express'
import authRoutes from './routes/authRoutes'
import connectDB from './config/db'


connectDB()

const server = express()

server.use(express.json())

server.use('/api/auth', authRoutes)

export default server