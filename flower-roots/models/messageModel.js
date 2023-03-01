const mongoose = require('mongoose')

const messageSchema = mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    text: {
      type: String,
      required: [true, 'Please add a text value']
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Message', messageSchema)
