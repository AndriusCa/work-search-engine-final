import mysql from "mysql2/promise";
import { DB_DATABASE, DB_HOST, DB_PASS, DB_USER } from "./env.js";
import { hash } from "./lib/hash.js"

async function setupDb() {
  // Susikuriame DB, jei nera
  let connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
  })

  // await connection.execute(`DROP DATABASE IF EXISTS \`${DB_DATABASE}\``)
  await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\``)
  connection.query(`USE \`${DB_DATABASE}\``)

  // Susikuriame lenteles
  await rolesTable(connection)
  await usersTable(connection)
  await tokensTable(connection)

  // Uzpildome informacija
    await generateRoles(connection);
    await generateUsers(connection)

  return connection;
}

async function usersTable(db) {
  try {
    const sql = `CREATE TABLE IF NOT EXISTS users (
                      id int(10) NOT NULL AUTO_INCREMENT,
                      fullname varchar(40) NOT NULL,
                      email varchar(45) NOT NULL,
                      password_hash varchar(128) NOT NULL,
                      role_id int(10) NOT NULL DEFAULT 2,
                      created timestamp NOT NULL DEFAULT current_timestamp(),
                      PRIMARY KEY (id),
                      KEY role_id (role_id),
                      CONSTRAINT users_ibfk_1 FOREIGN KEY (role_id) REFERENCES roles (id)
                  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;
    await db.execute(sql);
  } catch (error) {
    console.log("Nepavyko sukurti users lenteles");
    console.log(error);
    throw error;
  }
}

async function tokensTable(db) {
  try {
      const sql = `CREATE TABLE IF NOT EXISTS tokens (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        token varchar(36) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
                        user_id int(10) NOT NULL,
                        created timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY userId (user_id),
                        CONSTRAINT tokens_ibfk_1 FOREIGN KEY (user_Id) REFERENCES users (id)
                      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`
    await db.execute(sql)
  } catch (error) {
    console.log("Nepavyko sukurti tokens lenteles")
    console.log(error)
    throw error
  }
}

async function rolesTable(db) {
  try {
    const sql = `CREATE TABLE IF NOT EXISTS roles (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        role varchar(10) NOT NULL,
                        PRIMARY KEY (id)
                  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`
    await db.execute(sql)
  } catch (error) {
    console.log("Nepavyko sukurti roles lenteles")
    console.log(error)
    throw error
  }
}

async function generateRoles(db) {
  try {
    const sql = `INSERT INTO roles (role) VALUES ('admin'), ('seller'), ('buyer');`
    await db.execute(sql)
  } catch (error) {
    console.log('Nepavyko sugeneruoti roles lenteles turinio')
    console.log(error)
    throw error
  }
}

async function generateUsers(db) {
  try {
    const sql = `INSERT INTO users (fullname, email, password_hash, role_id) 
                    VALUES ('Andrius', 'andrius@andrius.lt', '${hash(
                      "andrius@andrius.lt"
                    )}', 1),
                        ('Petras Petraitis', 'Petrasas@petraitis.lt', '${hash(
                          "Petrasas@petraitis.lt"
                        )}', 2);`
    await db.execute(sql)
  } catch (error) {
    console.log('Nepavyko sugeneruoti users lenteles turinio')
    console.log(error)
    throw error
  }
}



export const connection = await setupDb();
