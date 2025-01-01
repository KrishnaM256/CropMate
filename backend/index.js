import express from 'express'
import { configDotenv } from 'dotenv'
import connectDB from './config/connectDB.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import contractRoutes from './routes/contractRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
configDotenv()
connectDB()
import { app, server } from './socket/server.js'

app.use(cookieParser())
const port = process.env.PORT || 5001

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.get('/', (req, res) => {
  console.log('Hello')
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('uploads'))

app.use('/api/users', userRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/contract', contractRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/notifications', notificationRoutes)

server.listen(port, () => {
  console.log(`Running on server http://localhost:${port}`)
})
