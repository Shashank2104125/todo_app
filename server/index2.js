const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cors = require('cors')

const port = 3000
app.use(cors())
app.use(bodyParser.json())
const todos=[];



app.get('/', (req, res) => {
  res.json(todos)
})

app.post("/", (req, res) => {
    const newTodo = req.body;
    todos.push(newTodo);
    res.json(todos);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})