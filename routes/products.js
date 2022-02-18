import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'

import {
  postproducts,
  getProducts,
  editProducts,
  delProducts,
  getAllProducts,
  getClassProducts
} from '../controllers/products.js'

const router = express.Router()

router.get('/:class', getClassProducts)
router.get('/:id', getProducts)
router.patch('/:id', auth, content('multipart/form-data'), upload, editProducts)
router.delete('/:id', auth, delProducts)
router.post('/', auth, content('multipart/form-data'), upload, postproducts)
router.get('/', getAllProducts)

export default router
