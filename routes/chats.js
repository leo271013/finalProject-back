import express from 'express'
import auth from '../middleware/auth.js'
import { getList, getChat, newMessage } from '../controllers/chats.js'

const router = express.Router()
router.get('/members/list/:id', auth, getList)
router.get('/members/:id', auth, getChat)
router.post('/members/:id/messages', auth, newMessage)

export default router
