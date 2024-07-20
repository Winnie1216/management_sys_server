const joi = require('joi')
const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()
exports.add_cate_schema = {
    body: {
        name: name,
        alias: alias
    }
}
exports.delete_cate_schema = {
    params: {
        id: id
    }
}