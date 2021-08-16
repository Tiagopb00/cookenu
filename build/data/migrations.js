"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
const users_json_1 = __importDefault(require("./users.json"));
const recipes_json_1 = __importDefault(require("./recipes.json"));
const printError = (error) => { console.log(error.sqlMessage || error.message); };
const createTables = () => connection_1.default
    .raw(`

      CREATE TABLE IF NOT EXISTS userTable (
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) UNIQUE NOT NULL,
         email VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL,
         role enum('NORMAL','ADMIN') DEFAULT 'NORMAL'
      );

      CREATE TABLE IF NOT EXISTS recipeTable (
         id VARCHAR(255) PRIMARY KEY,
         author VARCHAR(255),
         title VARCHAR(255) NOT NULL,
         description VARCHAR(255) NOT NULL,
         user_id VARCHAR(255),
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         FOREIGN KEY(userTable_id) REFERENCES userTable(id) 
      );

`)
    .then(() => { console.log("Tabelas criadas"); })
    .catch(printError);
const insertUsers = () => connection_1.default("userTable")
    .insert(users_json_1.default)
    .then(() => { console.log("Usuários criados"); })
    .catch(printError);
const insertRecipes = () => connection_1.default("recipeTable")
    .insert(recipes_json_1.default)
    .then(() => { console.log("Receitas criadas"); })
    .catch(printError);
const closeConnection = () => { connection_1.default.destroy(); };
createTables()
    .then(insertUsers)
    .then(insertRecipes)
    .finally(closeConnection);
