const express = require('express')

const expressJoi = require('@escook/express-joi')
const { add_cate_schema, delete_cate_schema } = require('../schema/articate')

const artCate_handler = require('../router_handler/artcate')
const router = express.Router()
router.get('/cates', artCate_handler.getArtCates)
router.post('/addcates', expressJoi(add_cate_schema), artCate_handler.addArticleCates)
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artCate_handler.deleteCateById)
module.exports = router