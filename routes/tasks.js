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

/* ADD TASK */
router.post('/', function (req, res, next) {
  Task.create(req.body)
    .then((newTask) => res.status(200).json(newTask))
    .catch((err) => next(err));
});

/* EDIT TASK */
router.put("/:id", async (req,res, next) => {
  try {
    await Task.update(req.body, {where: {id: req.params.id}});
    let updatedTask = await Task.findByPk(req.params.id);
    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
});

export {
    router as taskRouter,
};