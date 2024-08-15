import express from 'express';
import { Employee, Task } from '../database/models/index.js';

//initialize router
const router = express.Router();

//define routes

/** GET ALL EMPLOYEES: */
router.get('/', async (req, res, next) => {
  try {
    let employees = await Employee.findAll({include: [Task], order: [['id', 'ASC']]});
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

/***** DELETE EMPLOYEE: *****/
router.delete("/:id", function (req, res, next) {
  Employee.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json("EMPLOYEE DELETED"))
    .catch((err) => next(err));
});

/***** ADD EMPLOYEE: *****/
router.post("/", function (req, res, next) {
  Employee.create(req.body)
    .then((newEmployee) => res.status(200).json(newEmployee))
    .catch((err) => next(err));
});

/***** EDIT EMPLOYEE: *****/
router.put("/:id", async (req, res, next) => {
  try {
    await Employee.update(req.body, { where: { id: req.params.id } });
    let updatedEmployee = await Employee.findByPk(req.params.id);
    res.status(200).json(updatedEmployee);
  } catch (err) {
    next(err);
  }
});

export {
    router as employeeRouter,
};