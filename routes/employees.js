import express from 'express';
import { Employee, Task } from '../database/models/index.js';

//initialize router
const router = express.Router();

//define routes

/** GET ALL EMPLOYEES: */
router.get('/', async (req, res, next) => {
  try {
    let employees = await Employee.findAll({include: [Task]});
    res.status(200).json(employees);
  } catch(err) {
    next(err);
  }
});

/** GET A SINGLE EMPLOYEE BY ID: */
router.get('/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      include: [Task]
    });
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch(err) {
    next(err);
  }
});

/** UPDATE EMPLOYEE BY ID: */
router.put('/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      await employee.update(req.body);
      res.status(200).json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch(err) {
    next(err);
  }
});

router.post('/', async(req, res, next) => {
  try {
    const { firstname, lastname, department } = req.body;
    const newEmployee = await Employee.create({firstname, lastname, department});
    res.status(201).json(newEmployee);
  } catch(err){
    next(err);
  }
});

export {
    router as employeeRouter,
};