




const express = require('express');
const app = express();
const cors = require('cors');
const joi = require('joi');
const config = require('./config');
const expressJWT = require('express-jwt');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 封装 res.cc 函数  // //一定要在路由之前去封装res.cc函数
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        });
    };
    next();
});

// 使用 express-jwt 中间件保护接口
app.use(expressJWT.expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({ path: ['/api/login', '/api/reguser'] }));

// 注册路由
const userRouter = require('./router/user');
app.use('/api', userRouter);

const userinfoRouter = require('./router/userInfo');
app.use('/my', userinfoRouter);

// 错误处理中间件，确保返回 JSON 格式的错误信息
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        return res.status(400).json({
            status: 1,
            message: err.message
        });
    }
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            status: 1,
            message: '身份验证失败'
        });
    }
    res.status(500).json({
        status: 1,
        message: err.message
    });
});

const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)


app.listen(3007, () => {
    console.log('api server is running at http://127.0.0.1:3007');
});
