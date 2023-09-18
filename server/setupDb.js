import mysql from "mysql2/promise";
import { DB_DATABASE, DB_HOST, DB_PASS, DB_USER } from "./env.js";
import { hash } from "./lib/hash.js";

const DATABASE_RESET = false;

async function setupDb() {
  // Susikuriame DB, jei nera
  let connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
  })

  if (DATABASE_RESET) {
    await connection.execute(`DROP DATABASE IF EXISTS \`${DB_DATABASE}\``);
  }
  await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\``);
  connection.query(`USE \`${DB_DATABASE}\``);

  if (DATABASE_RESET) {
    // Susikuriame lenteles
    await rolesTable(connection);
    await usersTable(connection);
    await tokensTable(connection);
    await jobTypesTable(connection); 
    await steeringWheelTable(connection);
    await jobsTable(connection);

    // Uzpildome informacija
    await generateRoles(connection);
    await generateUsers(connection);
    await generateJobTypes(connection);
    await generateSteeringWheel(connection);
  }

  return connection;
}

async function usersTable(db) {
  try {
    const sql = `CREATE TABLE users (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        fullname varchar(30) NOT NULL,
                        email varchar(40) NOT NULL,
                        password_hash varchar(128) NOT NULL,
                        role_id int(10) NOT NULL DEFAULT 2,
                        is_blocked int(1) NOT NULL DEFAULT 0,
                        created timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY role_id (role_id),
                        CONSTRAINT users_ibfk_1 FOREIGN KEY (role_id) REFERENCES roles (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`
    await db.execute(sql)
  } catch (error) {
    console.log('Nepavyko sukurti "users" lenteles')
    console.log(error)
    throw error
  }
}

async function tokensTable(db) {
  try {
    const sql = `CREATE TABLE tokens (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        user_id int(10) NOT NULL,
                        token varchar(36) NOT NULL,
                        created timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY user_id (user_id),
                        CONSTRAINT tokens_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`
    await db.execute(sql)
  } catch (error) {
    console.log('Nepavyko sukurti "tokens" lenteles')
    console.log(error)
    throw error
  }
}

async function rolesTable(db) {
  try {
    const sql = `CREATE TABLE roles (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        role varchar(10) NOT NULL,
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`
    await db.execute(sql)
  } catch (error) {
    console.log('Nepavyko sukurti "roles" lenteles')
    console.log(error)
    throw error
  }
}

async function jobTypesTable(db) {
  try {
    const sql = `CREATE TABLE \`job-types\` (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        title varchar(40) NOT NULL,
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`
    await db.execute(sql)
  } catch (error) {
    console.log('Nepavyko sukurti "tob types" lenteles')
    console.log(error)
    throw error
  }
}

async function steeringWheelTable(db) {
  try {
    const sql = `CREATE TABLE \`steering-wheel\` (
                        id int(1) NOT NULL AUTO_INCREMENT,
                        side varchar(10) NOT NULL,
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`
    await db.execute(sql)
  } catch (error) {
    console.log('Nepavyko sukurti "steering-wheel" lenteles')
    console.log(error)
    throw error
  }
}

async function jobsTable(db) {
  try {
    const sql = `CREATE TABLE jobs (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        user_id int(10) NOT NULL,
                        job_type_id int(10) NOT NULL,
                        title varchar(200) NOT NULL,
                        color varchar(50) NOT NULL,
                        price int(6) unsigned NOT NULL DEFAULT 0,
                        year int(4) unsigned NOT NULL,
                        steering_wheel_id int(1) NOT NULL DEFAULT 0,
                        location varchar(50) NOT NULL,
                        mileage int(10) unsigned NOT NULL DEFAULT 0,
                        image varchar(100) NOT NULL,
                        created timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY user_id (user_id),
                        KEY job_type_id (job_type_id),
                        KEY steering_wheel_id (steering_wheel_id),
                        CONSTRAINT jobs_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id),
                        CONSTRAINT jobs_ibfk_2 FOREIGN KEY (steering_wheel_id) REFERENCES \`steering-wheel\` (id),
                        CONSTRAINT jobs_ibfk_3 FOREIGN KEY (job_type_id) REFERENCES \`job-types\` (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`
    await db.execute(sql)
  } catch (error) {
    console.log('Nepavyko sukurti "jobs" lenteles')
    console.log(error)
    throw error
  }
}

async function generateRoles(db) {
  try {
    const sql = `INSERT INTO roles (role) VALUES ('admin'), ('employer'), ('jobSeeker');`
    await db.execute(sql)
  } catch (error) {
    console.log('Nepavyko sugeneruoti "roles" lenteles turinio')
    console.log(error)
    throw error
  }
}

async function generateUsers(db) {
  try {
    const sql = `INSERT INTO users (fullname, email, password_hash, role_id) 
                    VALUES ('Andrius', 'andrius@andrius.lt', '${hash(
                      'andrius@andrius.lt'
                    )}', 1),
                        ('Jonas Jonaitis', 'jonas@jonas.lt', '${hash(
                          "jonas@jonas.lt"
                        )}', 2),
                        ('Petras Petraitis', 'petras@petras.lt', '${hash(
                          "petras@petras.lt"
                        )}', 2);`
    await db.execute(sql)
  } catch (error) {
    console.log('Nepavyko sugeneruoti "users" lenteles turinio')
    console.log(error)
    throw error
  }
}

async function generateJobTypes(db) {
  const jobTypes = [
    "Administravimas-darbų sauga",
    "Apsauga",
    "Dizainas-architektūra",
    "Eksportas",
    "Energetika-elektronika",
    "Finansai-apskaita-bankininkystė",
    "Informacinės technologijos",
    "Inžinerija-mechanika", "Klientų aptarnavimas-paslaugos", "Maisto gamyba", "Marketingas-reklama", "Medicina-farmacija", "Nekilnojamasis turtas", "Pardavimų vadyba", "Personalo valdymas", "Pirkimai-tiekimas", "Prekyba - konsultavimas", "Sandėliavimas", "Statyba", "Švietimas-mokymai-kultūra", "Teisė", "Transporto vairavimas", "Transporto-logistikos vadyba", "Vadovavimas-kokybės vadyba", "Valstybės tarnyba", "Žemės ūkis", "Žiniasklaida-komunikacija", "Kiti darbai"
  ]
  try {
    const sql = `INSERT INTO \`job-types\` (title) 
                    VALUES ${jobTypes.map((s) => `("${s}")`).join(", ")};`
    await db.execute(sql)
  } catch (error) {
    console.log('Nepavyko sugeneruoti "job-types" lenteles turinio')
    console.log(error)
    throw error
  }
}

async function generateSteeringWheel(db) {
  const steeringWheelSides = ["left", "right", "center", "none", "both"]
  try {
    const sql = `INSERT INTO \`steering-wheel\` (side) 
                    VALUES ${steeringWheelSides
                      .map((s) => `("${s}")`)
                      .join(", ")};`
    await db.execute(sql)
  } catch (error) {
    console.log('Nepavyko sugeneruoti "streering-wheel" lenteles turinio')
    console.log(error)
    throw error
  };
}

export const connection = await setupDb();
