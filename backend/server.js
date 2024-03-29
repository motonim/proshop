import express from 'express'
// 보통은 const express = require('express') 지만 frontend import 과 통일성 있게 쓰기 위해서 package.json 에서   "type": "module"로 명시하고 import 사용가능. otherwise, by default, it's type: commonjs where we can only use const, require...
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
const port = process.env.PORT || 5000 // if env.port doesn't exist, try with port 5000

connectDB() // Connect to MongoDB

const app = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes) // everytime we use /api/products, it's gonna call productRoutes
app.use('/api/users', userRoutes) // everytime we use /api/users, it's gonna call userRoutes

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))
