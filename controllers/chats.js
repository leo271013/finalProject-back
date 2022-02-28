// {$or:[{members:ObjectId('61ee3d419518739e2b8f937f')},{members:ObjectId('61ee2113e385af2d16efa02a')}]}
// import { query } from 'express'
import chats from '../models/chats.js'
// import mongoose from 'mongoose'

export const newMessage = async (req, res) => {
  try {
    let result = await chats.findOneAndUpdate({
      members: req.user._id.toString(), 'product._id': req.params.id
    }, {
      $push: {
        messages: {
          sender: req.user._id,
          text: req.body.text
        }
      }
    }, { new: true, runValidators: true })
    if (!result) {
      result = await chats.create({
        members: [req.user._id.toString(), req.body.product.userId],
        messages: [
          { sender: req.user._id, text: req.body.text }
        ],
        product: [{ userId: req.body.product.userId, title: req.body.product.title, image: req.body.product.image }]
      })
    }
    res.status(200).send({ success: true, message: '', result: result.messages.pop() })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getList = async (req, res) => {
  try {
    const result = await chats.find({ members: req.params.id })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getChat = async (req, res) => {
  try {
    if (req.query.gt) {
      const result = await chats.aggregate([
        {
          $match: {
            'product._id': req.params.id,
            members: {
              $all: [
                req.user._id.toString()
              ]
            }
          }
        }, {
          $unwind: {
            path: '$messages'
          }
        }, {
          $match: {
            'messages.date': {
              $gt: new Date(req.query.gt)
            }
          }
        }, {
          $group: {
            _id: '$_id',
            messages: {
              $push: '$messages'
            }
          }
        }
      ])
      res.status(200).send({ success: true, message: '', result: result || [] })
    } else if (req.query.lt) {
      const result = await chats.aggregate([
        {
          $match: {
            'product._id': req.params.id,
            members: {
              $all: [
                req.user._id.toString()
              ]
            }
          }
        }, {
          $unwind: {
            path: '$messages'
          }
        }, {
          $match: {
            'messages.date': {
              $lt: new Date(req.query.lt)
            }
          }
        }, {
          $sort: {
            'messages.date': -1
          }
        }, {
          $limit: 20
        }, {
          $group: {
            _id: '$_id',
            messages: {
              $push: '$messages'
            }
          }
        }
      ])
      res.status(200).send({ success: true, message: '', result: result || [] })
    } else {
      const result = await chats.find({
        members: {
          $all: [req.user._id.toString()]
        },
        'product._id': req.params.id
      }, { messages: { $slice: -20 } })
      res.status(200).send({ success: true, message: '', result: result[0].messages || [] })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
