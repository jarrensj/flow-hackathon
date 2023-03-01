const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: [true, 'need a wallet address'],
      unique: true
    },
    bio: {
      type: String
    },
  },
  {
    timestamp: true
  }
)

module.exports = mongoose.model('User', userSchema)