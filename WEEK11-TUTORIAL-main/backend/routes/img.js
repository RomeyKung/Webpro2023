const express = require("express");

const router = express.Router();

// Get comment
router.get('/uploads/:id', function(req, res, next){
    res.render(path.join(__dirname, '../static/uploads/' + req.params.id));
});


exports.router = router
