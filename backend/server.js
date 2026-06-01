const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running smoothly!Yaaay");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});



app.get("/tasks", (req, res) => {
  res.json(tasks);
});


app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    status: "pending"
  };

  tasks.push(newTask);
  res.json(newTask);
});

app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);

  res.json({ message: "Task deleted" });
});


app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.json({ message: "Task not found" });
  }

  task.title = req.body.title || task.title;
  task.status = req.body.status || task.status;

  res.json(task);
});




const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.send('Server is running ');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});