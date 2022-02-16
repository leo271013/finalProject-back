import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'

import {
  postproducts
} from '../controllers/products.js'

const router = express.Router()

router.post('/', content('application/json'), auth, upload, postproducts)

export default router
