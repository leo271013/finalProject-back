import products from '../models/products.js'

export const postproducts = async (req, res) => {
  try {
    const result = await products.create({ ...req.body, image: req.file.path })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.log(error)
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const getProducts = async (req, res) => {
  try {
    const result = await products.find({ userId: req.params.id })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const editProducts = async (req, res) => {
  const data = {
    name: req.body.name,
    class: req.body.class,
    state: req.body.state,
    barter: req.body.barter,
    quantity: req.body.quantity,
    goal: req.body.goal,
    userId: req.body.userId,
    introTitle: req.body.introTitle,
    introContent: req.body.introContent
  }
  if (req.file) {
    data.image = req.file.path
  }
  if (req.body.sale) {
    data.sale = req.body.sale
  }
  try {
    const result = await products.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到' })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const delProducts = async (req, res) => {
  try {
    const result = await products.findByIdAndDelete(req.params.id)
    if (result) {
      res.status(200).send({ success: true, message: '' })
    } else {
      res.status(404).send({ success: false, message: '查無帳號' })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '查無帳號' })
    } else {
      // 未知錯誤
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
