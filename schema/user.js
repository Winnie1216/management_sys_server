const joi = require('joi')
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^\S{6,12}$/).required()
exports.reg_login_schema = {
    body: {
        username: username,
        password: password
    }
}

const nickname = joi.string().required()
const email = joi.string().email().required()
exports.update_userinfo_schema = {
    body: {

        nickname: nickname,
        email: email
    }
}
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}