const { Pool } = require("pg")

// Create a new pool
const pool = new Pool({
  user: "timsina", // Replace with your PostgreSQL username
  host: "localhost", // Replace with your database host
  database: "todos", // Replace with your database name
  password: "drowssap10", // Replace with your PostgreSQL password
  port: 5432, // Default PostgreSQL port
})

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack)
  }
  console.log("Connected to the database")
  release() // Release the client back to the pool
})

module.exports = pool


