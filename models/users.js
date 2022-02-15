import mongoose from 'mongoose'
import md5 from 'md5'

const userSchema = new mongoose.Schema({
  account: {
    type: String,
    minlength: [4, '帳號必須 4 個字以上'],
    maxlength: [20, '帳號必須 20 個字以下'],
    unique: true,
    required: [true, '帳號不能為空']
  },
  password: {
    type: String,
    required: [true, '密碼不能為空']
  },
  role: {
    // 0 = 一般會員
    // 1 = 管理員
    // 2 = 團體(暫無)
    type: Number,
    default: 0
  },
  tokens: {
    type: [String]
  },
  product: {
    type: [
      {
        productName: {
          type: mongoose.ObjectId,
          ref: 'productsName',
          required: [true, '缺少商品 ID']
        },
        quantity: {
          type: Number,
          required: [true, '缺少商品數量']
        },
        imageURL: {
          type: String,
          required: [true, '缺少商品圖片']
        },
        productType: {
          type: String,
          required: [true, '缺少商品種類']
        },
        give: {
          type: Boolean,
          required: [true, '請選擇是否以物易物']
        },
        target: {
          type: String,
          required: [true, '請選擇交換對象']
        }
      }
    ]
  },
  userName: {
    type: String,
    minlength: [1, '名稱必須 1 個字以上'],
    maxlength: [10, '帳號必須 10 個字以下'],
    required: [true, '名稱不能為空'],
    default: '使用者'
  },
  aboutMe: {
    type: String,
    maxlength: [50, '介紹必須 50 個字以下'],
    default: ''
  },
  image: {
    type: String,
    default: 'https://res.cloudinary.com/duastxica/image/upload/v1644384306/pngegg_vy0np4.png'
  }
}, { versionKey: false })

userSchema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    if (user.password.length >= 4 && user.password.length <= 20) {
      user.password = md5(user.password)
    } else {
      const error = new mongoose.Error.ValidationError(null)
      error.addError('password', new mongoose.Error.ValidatorError({ message: '密碼長度錯誤' }))
      next(error)
      return
    }
  }
  next()
})

userSchema.pre('findOneAndUpdate', function (next) {
  const user = this._update
  if (user.password) {
    if (user.password.length >= 4 && user.password.length <= 20) {
      user.password = md5(user.password)
    } else {
      const error = new mongoose.Error.ValidationError(null)
      error.addError('password', new mongoose.Error.ValidatorError({ message: '密碼長度錯誤' }))
      next(error)
      return
    }
  }
  next()
})

export default mongoose.model('users', userSchema)
