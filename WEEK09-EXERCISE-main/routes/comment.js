const express = require("express");
const pool = require("../config");
const router = express.Router();

// Get comment
router.get('/:blogId/comments', function (req, res, next) {
});

// Create new comment
router.post('/:blogId/comments', async function (req, res, next) {
    try {
        const [rows, fields] = await pool.query("INSERT INTO comments (comment, blog_id, comment_date) VALUES (?, ?, ?)",
            [req.body.comment, req.params.blogId, new Date()]);

        return res.json({message:`A new comment is added (ID: ${rows.insertId})`})
    } catch (error) {
        console.log(error)
    }
});

// Update comment
router.put('/comments/:commentId', async function (req, res, next) {
    try {
        const [rows, fields] = await pool.query(
            "UPDATE comments SET blog_id=?, comment=?, comments.like=?, comment_date=?, comment_by_id=? WHERE id=?",
            [
                req.body.blog_id,
                req.body.comment,
                req.body.like,
                req.body.comment_date,
                req.body.comment_by_id,
                req.params.commentId
            ]);

        return res.json({message:`Comment ID ${req.params.commentId} is updated.`
                        , comment: req.body})
    } catch (error) {
        console.log(error)
    }
});

// Delete comment
router.delete('/comments/:commentId', async function (req, res, next) {
    const [rows, fields] = await pool.query("DELETE FROM comments WHERE id=?", [req.params.commentId]);
    return res.json({message:`Comment ID ${rows.insertId} is delete.`})

});

// add like
router.put('/comments/addlike/:commentId', async function (req, res, next) {
    const [rows, fields] = await pool.query("UPDATE comments  SET comments.like = comments.like + 1 WHERE id=?",
    [req.params.commentId]);

    const [rows2, fields2] = await pool.query("SELECT * FROM comments WHERE id=?", [req.params.commentId]);
    console.log(rows2[0])
    return res.json({
        blogId: rows2[0].blog_id,
        commentId: rows2[0].id,
        likeNum: rows2[0].like
    })
});


exports.router = router
