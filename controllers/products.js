import products from '../models/products.js'
import jwt from 'jsonwebtoken'

export const postproducts = async (req, res) => {
  try {
    const product = await products.findOne(

    )
    if (product) {
      const token = jwt.sign({ _id: product._id.toString() }, process.env.SECRET, { expiresIn: '7 days' })
      product.tokens.push(token)
      await product.save()
      const result = product.toObject()
      delete result.tokens
      result.token = token
      res.status(200).send({ success: true, message: '', result })
    } else {
      res.status(404).send({ success: false, message: '帳號或密碼錯誤' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
