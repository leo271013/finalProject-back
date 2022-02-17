import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'

import {
  postproducts,
  getProducts
} from '../controllers/products.js'

const router = express.Router()

router.post('/', auth, content('multipart/form-data'), upload, postproducts)
router.get('/:id', getProducts)

export default router
