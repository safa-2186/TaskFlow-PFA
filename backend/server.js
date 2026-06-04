const express = require("express");
const cors = require("cors");
const db = require("./db");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Backend running smoothly! Yaaay");
});

app.use("/tasks", taskRoutes);


db.getConnection()
  .then((conn) => {
    conn.release();
    console.log("Connected to MySQL database!");
    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
  });



 




