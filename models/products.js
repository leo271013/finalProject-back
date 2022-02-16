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
    type: Boolean,
    required: [true, '是否以物易物不能為空']
  },
  quantity: {
    type: Number,
    required: [true, '商品分類不能為空']
  },
  goal: {
    type: String,
    required: [true, '目標不能為空']
  }
}, { versionKey: false })

export default mongoose.model('products', productSchema)
