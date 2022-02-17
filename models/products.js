import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '商品名不能為空']
  },
  class: {
    type: String,
    required: [true, '商品分類不能為空']
  },
  state: {
    type: String,
    required: [true, '商品狀態不能為空']
  },
  image: {
    type: String,
    required: [true, '圖片不能為空']
  },
  barter: {
    type: String,
    required: [true, '是否以物易物不能為空']
  },
  quantity: {
    type: Number,
    required: [true, '商品分類不能為空']
  },
  goal: {
    type: String,
    required: [true, '目標不能為空']
  },
  userId: {
    type: mongoose.ObjectId,
    required: [true, '使用者不能為空']
  },
  introTitle: {
    type: String,
    required: [true, '介紹標題不能為空']
  },
  introContent: {
    type: String,
    required: [true, '介紹內容不能為空']
  },
  sale: {
    type: Boolean,
    default: true
  }

}, { versionKey: false })

export default mongoose.model('products', productSchema)
