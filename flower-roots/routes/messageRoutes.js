const express = require('express')
const router = express.Router()
const { 
  getMessages,
  getSentMessages,
  createMessage, 
} = require('../controllers/messageController')

const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getMessages)

router.get('/sent', protect, getSentMessages)

router.post('/', protect, createMessage)

module.exports = router