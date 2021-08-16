import connection  from "./connection"
import users from "./users.json"
import recipes from "./recipes.json"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTables = () => connection
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
   .then(() => { console.log("Tabelas criadas") })
   .catch(printError)

const insertUsers = () => connection("userTable")
   .insert(users)
   .then(() => { console.log("Usuários criados") })
   .catch(printError)

const insertRecipes = () => connection("recipeTable")
   .insert(recipes)
   .then(() => { console.log("Receitas criadas") })
   .catch(printError)

const closeConnection = () => { connection.destroy() }

createTables()
   .then(insertUsers)
   .then(insertRecipes)
   .finally(closeConnection)