const express = require('express')
const app = express()
const joi = require('joi')
const config = require('./config')


const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: false }))



//一定要在路由之前去封装res.cc函数
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        }
        )

    }
    next()
})
const expressJWT = require('express-jwt')
app.use(expressJWT.expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({ path: ['/api'] }))
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    if (err.name === 'UnauthorizedError') {
        return res.cc('身份验证失败')
    }
    return res.cc(err)
})

const userRouter = require('./router/user')
app.use('/api', userRouter)
const userinfoRouter = require('./router/userInfo')
app.use('/my', userinfoRouter)



app.listen(3007, () => {
    console.log('api server is running at http://127.0.0.1:3007');
})

