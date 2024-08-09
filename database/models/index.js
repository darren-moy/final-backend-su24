import { Employee } from "./Employee.js";
import { Task } from "./Task.js";

Task.belongsTo(Employee);
Employee.hasMany(Task);

async function seedDb() {
    const employee1 = await Employee.create({
        firstname: "Melissa",
        lastname: "Lynch",
        department: "Computer Science",
    });
    const employee2 = await Employee.create({
        firstname: "Walter",
        lastname: "White",
    });
    
    const task1 = await Task.create({
        content: "Make exams",
        priority: 2,
        completed: false,
    });
    const task2 = await Task.create({
        content: "Organize classroom",
        completed: true,
    });

    await task1.setEmployee(employee2);
    await task2.setEmployee(employee1);

}

export {
  Employee,
  Task,
  seedDb
};