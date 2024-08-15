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
    const employee3 = await Employee.create({
        firstname: "Darren",
        lastname: "Moy",
        department: "GAMING"
    })
    
    const task1 = await Task.create({
        content: "Make exams",
        priority: 2,
        completed: false,
    });
    const task2 = await Task.create({
        content: "Organize classroom",
        completed: true,
    });
    const task3 = await Task.create({
        content: "Play 5 games of CS2",
        completed: false,
    })

    await task1.setEmployee(employee2);
    await task2.setEmployee(employee1);
    await task3.setEmployee(employee3);

}

export {
  Employee,
  Task,
  seedDb
};