import express from "express"
const router = express.Router()
import products from '../data/products.js'

router.get('/', async (req, res) => {
    res.json(products)
  })
  
router.get('/:id', (req, res) => {
    // :id is a placeholder
    const product = products.find((p) => p._id === req.params.id)
    res.json(product)
})

export default router