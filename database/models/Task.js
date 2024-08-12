import { Sequelize } from "sequelize";
import { db } from "../index.js";

export const Task = db.define("task", {
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  priority: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },

  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

