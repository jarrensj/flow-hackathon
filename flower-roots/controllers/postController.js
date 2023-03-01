const asyncHandler = require('express-async-handler')

const Post = require('../models/postModel')
const User = require('../models/userModel')

// @desc:   get all posts 
// @route:  GET /api/posts
// @access: public 
const getPosts = asyncHandler(async (req, res) => {
  // return all posts
  const posts = await Post.find({})

  res.status(200).json(posts)
})

// @desc:   create a post
// @route:  POST /api/posts
// @access: private 
const createPost = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('missing text')
  }

  const post = await Post.create({
    user: req.user.id,
    text: req.body.text
  });

  res.status(200).json(post);
})

module.exports = {
  getPosts, createPost
}