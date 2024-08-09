import { Sequelize } from "sequelize";
import { db } from "../index.js";

export const Employee = db.define("employee", {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  department: {
    type: Sequelize.STRING,
  },
});

