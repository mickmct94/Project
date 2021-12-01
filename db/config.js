const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
})

const dbQuery = function(query) {

return new Promise(function (resolve, reject) {

    pool.getConnection(function (err, connection) {

      if (err) reject(err);

      connection.query(query, function (err, data) {

        connection.release();

        if (err) reject(err);
        else {

          const returnedData = data;
          resolve(returnedData);

        }
      })
    })

  })
}
module.exports = {
    pool,
    dbQuery
}