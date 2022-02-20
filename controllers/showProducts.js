import products from '../models/products.js'

export const getAllProducts = async (req, res) => {
  try {
    const result = await products.find({ sale: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getClassProducts = async (req, res) => {
  try {
    const result = await products.find({ sale: true, class: req.params.class })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
