import express from 'express'

import {
  getAllProducts,
  getClassProducts
} from '../controllers/showProducts.js'

const router = express.Router()

router.get('/:class', getClassProducts)
router.get('/', getAllProducts)

export default router
