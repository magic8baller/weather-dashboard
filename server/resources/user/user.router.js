const {Router} = require('express')
const {me, updateMe, meFromToken} = require('./user.controller')

const userRouter = Router()

userRouter.get('/', me)
userRouter.put('/', updateMe)
userRouter.get('/me', meFromToken)
module.exports = userRouter