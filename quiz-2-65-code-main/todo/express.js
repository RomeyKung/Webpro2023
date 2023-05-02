const express = require('express')
const app = express()
const port = 3000

const pool = require("./config/database")

app.get('/todo', (req, res, next) => {
  res.send('GET ToDo List')
})

app.post('/todo', (req, res, next) => {
  res.send('POST create a new ToDo')
})

app.get('/todo/:id', async (req, res, next) => {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM todo WHERE id=?", [req.params.id])
    res.json(rows[0])
  } catch (err) {
    console.log(err)
    next(err)
  }
})

app.delete('/todo/:id', (req, res, next) => {
  res.send(`DELETE a ToDo with id = ${req.params.id}`)
})

module.exports = app