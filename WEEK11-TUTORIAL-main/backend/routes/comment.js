const express = require("express");
const pool = require("../config");
const path = require("path")
const router = express.Router();


// Require multer for file upload
const multer = require('multer')
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

router.get('/:blogId/comments', function(req, res, next){
});


// Create new comment
router.post('/:blogId/comments', upload.single('myImage'), async function(req, res, next){
    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();
    const file = req.file;
    const comment = req.body.comment;
    try {
      let results = await conn.query("INSERT INTO comments (blog_id, comment, comments.like, comment_by_id) VALUES (?, ?, ?, ?);", [
        req.params.blogId, comment, 0, null
      ]);
      const Id = results[0].insertId;
      if(file){
        await conn.query(
          "INSERT INTO images(blog_id, file_path, comment_id) VALUES(?, ?, ?);",
          [req.params.blogId, file.path.substr(6), Id])
      }

      await conn.commit()
    } catch (err) {
      await conn.rollback();
      next(err);
    } finally {
      console.log('finally')
      res.send("success! Dog");
      conn.release();
    }
});

// Create new comment
// router.post('/:blogId/comments', async function(req, res, next){
//     try{
//     const [id] = await pool.query("select max(id)+1`nextId` from comments")
//     const [rows, fields] = await pool.query("INSERT INTO comments (blog_id, comment, comments.like, comment_by_id) VALUES (?, ?, ?, ?);", [
//         req.params.blogId, req.body.comment, req.body.like, req.comment_by_id
//     ]);
//     // return json ของรายการ blogs
//     return res.json({message:"A new comment is added (ID: " +id[0].nextId + ')'});
//   } catch (err) {
//     console.log(req.body.comment)
//     return next(err);
//   }
// });

// Update comment
router.put('/comments/:commentId', async function(req, res, next){
    try{
        const [rows, fields] = await pool.query("update comments set blog_id = ?, comment = ?, comments.like = ?, comment_by_id = ?, comment_date = ? where id = ?;", [
            req.body.blog_id, req.body.comment, req.body.like, req.body.comment_by_id, req.body.comment_date, req.params.commentId
        ]);
        // return json ของรายการ blogs
        return res.json({
            message:"Comment ID "+req.params.commentId+" is updated",
            comment:req.body
        });

      } catch (err) {
        console.log(err)
        return next(err);
      }
});

// Delete comment
router.delete('/comments/:commentId', async function(req, res, next){
    try{
        const [rows, fields] = await pool.query("delete from comments where id =?;", [
            req.params.commentId
        ]);
        // return json ของรายการ blogs
        return res.json({message:"Comment ID " +req.params.commentId + ' is deleted.'});

      } catch (err) {
        console.log(err)
        return next(err);
      }
});


router.put('/comments/addlike/:commentId',async function(req, res, next){
    try{
        const [bog] = await pool.query("select blog_id from comments where id=?;",[
            req.params.commentId
        ])
        const [lik] = await pool.query("select comments.like from comments where id=?;",[
            req.params.commentId
        ])

        const [rows, fields] = await pool.query("update comments set comments.like = comments.like +  1 where id = ?;", [
            req.params.commentId
        ]);
        // return json ของรายการ blogs
        return res.json({
            blogId:bog[0].blog_id,
            commentId:req.params.commentId,
            likenum:lik[0].like +1


        });

      } catch (err) {
        console.log(err)
        return next(err);
      }
});


exports.router = router
