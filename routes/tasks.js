import express from 'express';
import { Employee, Task } from '../database/models/index.js';

//initialize router
const router = express.Router();

//define routes

/***** GET ALL TASKS: *****/
router.get('/', async (req, res, next) => {
  try {
    let tasks = await Task.findAll({include: [Employee]});
    res.status(200).json(tasks);
  } catch(err) {
    next(err);
  }
});

/***** DELETE TASK: *****/
router.delete("/:id", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.destroy();
    res.status(200).json("Deleted a task!");
  } catch (err) {
    next(err);
  }
});

export {
    router as taskRouter,
};