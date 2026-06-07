const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");

router.use(auth);

router.get("/", taskController.getAllTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.patch("/:id", taskController.patchTaskStatus);
router.delete("/:id", taskController.deleteTask);

module.exports = router;