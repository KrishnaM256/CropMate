import express from 'express'
import { configDotenv } from 'dotenv'
import connectDB from './config/connectDB.js'
import cookieParser from 'cookie-parser'
import path from 'path'
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'

import cors from 'cors'

configDotenv()
connectDB()

const app = express()
app.use(cookieParser())
const port = process.env.PORT || 5001

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)
// app.use('/api/category', categoryRoutes)

app.listen(port, () => {
  console.log(`Running on server http://localhost:${port}`)
})
