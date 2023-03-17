const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
    var data = { title: 'Express' , name:'Rome'}
    res.render('index', data)
})
 
module.exports = router