import express from 'express';
import { taskRouter } from './tasks.js';
import { employeeRouter } from './employees.js';

const router = express.Router();

router.use("/tasks", taskRouter);
router.use("/employees", employeeRouter);

export {
    router as apiRouter,
};

