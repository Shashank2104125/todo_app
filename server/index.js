const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
const mongoose = require("mongoose"); 
const uri = 'mongodb://localhost:27017/Todos';
const port = 3000
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(e=> console.log("MongoDB is ready and connected"))
        .catch(console.error)

const todoSchema= new mongoose.Schema({
  title:String,
});

const Todos = mongoose.model('Todo', todoSchema);

app.get('/', async(req, res) => {
  try {
     const todos = await Todos.find({});
      res.json(todos)
  } catch (error) {
     res.status(500).send("Error")
  }
})

app.post("/", async(req, res) => {
    const newTodo = new Todos(req.body);
    await newTodo.save();
    res.json({message:'Todo add succesfully',todoId:newTodo.id});
  });

  app.put("/", async (req, res) => {
    try {
      const modified = await Todos.findByIdAndUpdate(req.body._id, req.body, { new: true }).exec();
  
      if (modified) {
        res.json({ message: 'Todo Update Successfully', updatedTodo: modified });
      } else {
        res.status(404).json({ message: 'Error in Updating' });
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.delete("/", async (req, res) => {
    try {
      const delete_todo = await Todos.findByIdAndDelete(req.query._id).exec();
  
      if (delete_todo) {
        console.log({ message: 'Delete successful' });
        res.status(204).end(); // 204 means "No Content" and is a common response for successful DELETE requests
      } else {
        res.status(404).json({ message: 'Error in Deleting: Document not found' });
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})