const {Router} = require('express')
import {me, updateMe} = require('./user.controllers')

const userRouter = Router()

userRouter.get('/', me)
userRouter.put('/', updateMe)

module.exports = userRouter