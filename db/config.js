const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "A4wW[)nn@R(NH9VP",
    database: "test"
})

module.exports = pool;