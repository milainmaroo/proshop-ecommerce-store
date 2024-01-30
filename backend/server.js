import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import products from './data/products.js'
const port = process.env.PORT || 8000

connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running...')
})

// Products Route
app.get('/api/products', (req, res) => {
  res.json(products)
})

// Single Product Route
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

app.listen(port, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${port}`
  )
)
