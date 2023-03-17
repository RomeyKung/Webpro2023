const express = require('express')
const router = express.Router()

const article = require('../article-db.json')

router.get('/blogapi', (req, res) => {
  var data = {
    title:"All Blogs",
    article:article
  }
  res.render('blog_list', data)
})

router.get('/blogapi/:id/:name', (req, res) => {
  console.log(req.query)
  res.json(article.find(article => article.id === req.params.id))
})




module.exports = router