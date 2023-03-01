const asyncHandler = require('express-async-handler')
const messageModel = require('../models/messageModel')

const Message = require('../models/messageModel')

// @desc:   get messages that are sent to user 
// @route:  GET /api/messages
// @access: private 
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ recipient: req.user._id });
  res.status(200).json(messages);
})

// @desc:   get messages that are sent from user
// @route:  GET /api/messages/sent
// @access: private 
const getSentMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ sender: req.user._id })
  res.status(200).json(messages)
})

// @desc:   sends a message
// @route:  POST /api/messages
// @access: private 
const createMessage = asyncHandler(async (req, res) => {

  // TODO: check if text, there's a sender and recipient and also if the person calling this is the actual sender  
  if (!req.body.text) {
    res.status(400)
    throw new Error('missing text')
  }

  const message = await Message.create({
    text: req.body.text,
    sender: req.user.id,
    recipient: req.body.recipient
  })

  res.status(200).json(message)
})


module.exports = {
  getMessages, getSentMessages, createMessage
}