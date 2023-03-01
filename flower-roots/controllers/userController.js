const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc:   register new user
// @route:  POST /api/users
// @access: Public
const registerUser = asyncHandler(async (req, res) => {
  const { walletAddress } = req.body

  if(!walletAddress) {
    res.status(400)
    throw new Error('Please add all required fields')
  }

  // check if user exists
  const userExists = await User.findOne({walletAddress})

  if(userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  
  const user = await User.create({
    walletAddress,
  })

  if(user) {
    res.status(201).json({
      _id: user.id,
      walletAddress: user.walletAddress,
      token: generateToken(user._id)
    })
  } 
  else {
    res.status(400)
    throw new Error('invalid user data')
  }
})

// @desc:   authenticate user
// @route:  POST /api/users/login
// @access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { walletAddress } = req.body

  const user = await User.findOne({walletAddress})

  // TODO: need to check if actually them 

  if(user) {
    res.json({
      _id: user.id,
      username: user.username,
      token: generateToken(user._id),
      bio: user.bio
    })
  } 
  else {
    res.status(400)
    throw new Error('invalid credentials')
  }
})

// @desc:   update user profile
// @route:  put /api/users/me
// @access: Private
const updateProfile = asyncHandler(async(req, res) => {

  // check if that user exists
  const user = await User.findById(req.user.id)
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedUser)
})

// @desc:   get user data
// @route:  GET /api/users/me
// @access: Private
const getMe = asyncHandler(async(req, res) => {
  const { _id, walletAddress, bio } = await User.findById(req.user.id)

  res.status(200).json({
    id: _id,
    walletAddress,
    bio
  })
})

// generate jwt 
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = { registerUser, loginUser, getMe, updateProfile }