import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  members: {
    type: [mongoose.ObjectId],
    ref: 'users',
    required: true
  },
  product: {
    type: [
      {
        userId: {
          type: [mongoose.ObjectId]
        },
        title: {
          type: String
        },
        image: {
          type: String
        }
      }
    ]
  },
  messages: {
    type: [
      {
        sender: {
          type: mongoose.ObjectId,
          ref: 'users',
          required: true
        },
        text: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  }
})

export default mongoose.model('chats', schema)
