const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running smoothly!Yaaay");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

let tasks = [
  { id: 1, title: "Design UI", status: "in Progress" },
  { id: 2, title: "Build backend", status: "in Progress" },
  { id: 3, title: "Build Database and API", status: "To Do" },
  { id: 4, title: "Build frontend", status: "To Do" }
];

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


