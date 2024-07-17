const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')


exports.regUser = (req, res) => {
    const userInfo = req.body
    console.log(userInfo);
    // if (!userInfo.username || !userInfo.password) {
    //     // return res.send({ status: 1, message: '用户名或者密码不合法！' })
    //     return res.cc(err)
    // }

    const sqlStr = ` select * from ev_users where username=? `
    db.query(sqlStr, userInfo.username, (err, results) => {
        if (err) {
            return res.send({ status: 1, message: err.message })
        }
        if (results.length > 0) {
            // return res.send({
            //     status: 1, message: '用户名已被占用，请更换其他用户名'
            // })
            return res.cc('用户名已被占用，请更换其他用户名')
        }
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        //定义插入的sql语句
        const sql = 'insert into ev_users set?'
        db.query(sql, { username: userInfo.username, password: userInfo.password }, (err, results) => {
            if (err) {
                // res.send({ status: 1, message: err.message })
                return res.cc('用户名已被占用，请更换其他用户名')
            }
            if (results.affectedRows !== 1) {
                // res.send({ status: 1, message: '注册用户失败，请稍后再试' })
                return res.cc('注册用户失败，请稍后再试')
            }
            res.cc('注册成功', 0)
        })
    })
}
exports.login = (req, res) => {
    const userInfo = req.body
    const sql = `select * from ev_users where username=?`
    db.query(sql, userInfo.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length != 1) {
            return res.cc('登陆失败')
        }
        const compaRerResults = bcrypt.compareSync(userInfo.password, results[0].password)
        if (!compaRerResults) {
            return res.cc('登录失败')
        }
        // res.cc('登陆成功', 0)
        const user = { ...results[0], password: '', user_pic: '' }
        console.log(user);
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expireIn })
        res.send({
            status: 0,
            message: '登陆成功',
            token: 'Bearer ' + tokenStr
        })
        //对用户的信息加密生成token字符串
    })

}


