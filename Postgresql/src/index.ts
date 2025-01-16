import { Client } from "pg";

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "first",
  password: "#@Aaditya@pgsql.",
  port: 5432,
});

async function conntodb() {
  await client.connect();
  console.log("Connected to postgres");
}

conntodb();

// const result = client
//   .query(
//     `CREATE TABLE users(
//       id SERIAL PRIMARY KEY,
//       username VARCHAR(50) UNIQUE NOT NULL,
//       email VARCHAR(50) UNIQUE NOT NULL,
//       password VARCHAR(50) NOT NULL,
//       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//       )`
//   )

//Make sure to write the embedded values into proper single/double quotes too, else psql will take this as a column
async function getData(username: string) {
  try {
    console.log(username);
    const getQuery = `SELECT * FROM users WHERE username = '${username}'`;
    const result = await client.query(getQuery);
    console.log(result);
  } catch (e) {
    console.log(e);
  } finally {
    await client.end();
  }
}

//Use this way to run the SQL queries to avoid any SQL injection.
async function insertData(username: string, email: string, password: string) {
  try {
    console.log(username, password, email);

    const insertQuery =
      "INSERT INTO users (username,email, password) VALUES ($1,$2,$3)";
    const values = [username, email, password];

    const result = await client.query(insertQuery, values);
    console.log(result);
  } catch (e) {
    console.log(e);
  } finally {
    await client.end();
  }
}

async function updateData(username: string, password: string) {
  try {
    const updateQuery = `UPDATE users SET password = '${password}' WHERE username = '${username}'`;
    const result = await client.query(updateQuery);
    console.log(result);
  } catch (e) {
    console.log(e);
  } finally {
    await client.end();
  }
}

async function deleteData(username: string) {
  try {
    const deleteQuery = `DELETE FROM users WHERE username = '${username}'`;
    const result = await client.query(deleteQuery);
    console.log(result);
  } catch (e) {
    console.log(e);
  } finally {
    await client.end();
  }
}

// insertData("aaditya2", "new@gamil.com", "secret");

//getData("aaditya");

//deleteData("aaditya");

//updateData("aaditya2", "newsecret");

//Relationships.

// const result1 = client.query(`
//     CREATE TABLE users (
//        id SERIAL PRIMARY KEY,
//        username VARCHAR(50) UNIQUE NOT NULL,
//        email VARCHAR(50) UNIQUE NOT NULL
//       )
//    `);

// const result2 = client.query(`
//      CREATE TABLE addresses (
//          id SERIAL PRIMARY KEY,
//          user_id INT UNIQUE NOT NULL,
//          country VARCHAR(50) NOT NULL,
//          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//      )
//    `);

// // console.log(result1);
// console.log(result2);

//Transactions.

// async function insertDataTogether(
//   username: string,
//   email: string,
//   country: string
// ) {
//   try {
//     await client.query("BEGIN");

//     const insert1 = `INSERT INTO users (username,email) VALUES ($1,$2) RETURNING id `;
//     const values1 = [username, email];
//     const result1 = await client.query(insert1, values1);
//     const userId = result1.rows[0].id;

//     const insert2 = `INSERT INTO addresses (user_id,country) VALUES ($1,$2)`;
//     const values2 = [userId, country];
//     const result2 = await client.query(insert2, values2);

//     console.log(result1);
//     console.log(result2);

//     await client.query("COMMIT");
//   } catch (e) {
//     console.log(e);
//   } finally {
//     await client.end();
//   }
// }

// insertDataTogether("aadityad", "abc@9gmaild.com", "Australiad");
