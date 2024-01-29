"use strict";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Sequelize from "sequelize";
import process from "process";
import jsonConfig from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = jsonConfig[env];
const db = {};

if (env === "development") config.host = "db";

config.logging = process.env.SEQUELIZE_LOG === "false" ? false : console.log;

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    ...config,
    define: {
      underscored: true,
    },
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    define: {
      underscored: true,
    },
  });
}

const files = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 &&
    file !== basename &&
    file.slice(-3) === ".js" &&
    file.indexOf(".test.js") === -1
  );
});

// console.log(files);

for (const file of files) {
  const filePath = path.join(__dirname, file);
  const moduleImport = await import(filePath);
  const model = moduleImport.default(sequelize, Sequelize);
  // console.log(moduleImport.default(sequelize)())
  // console.log(model instanceof Sequelize.Model);
  db[model.name] = model;
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
