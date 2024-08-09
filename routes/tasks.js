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
router.delete("/:id", function (req, res, next) {
  Task.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.status(200).json("Deleted a task!"))
    .catch((err) => next(err));
});

export {
    router as taskRouter,
};