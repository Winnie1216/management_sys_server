const express = require('express')
const router = express.Router()

const user_handler = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')



router.post('/reguser', expressJoi(reg_login_schema), user_handler.regUser)
router.post('/login', expressJoi(reg_login_schema), user_handler.login)

// router.post('/login', user_handler.login)
module.exports = router