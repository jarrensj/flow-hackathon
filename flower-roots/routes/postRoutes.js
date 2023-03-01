const express = require('express')
const router = express.Router()
const { 
  getPosts,
  createPost 
} = require('../controllers/postController')

const { protect } = require('../middleware/authMiddleware')

router.get('/', getPosts)

router.post('/', protect, createPost)

module.exports = router