const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "Mick91000",
    database: "projectpractice"
})


const getStudents = function() {

return new Promise(function(resolve, reject){

pool.getConnection(function(err,connection) {
 
    if(err) reject (err)

    connection.query("SELECT * FROM student",function(err,data){
        connection.release();

        if(err) reject (err);
        else { 
            const students = data;
            resolve(students);
        }
 
    })

 })
})
}

const getStudentByID = function(params) {

    return new Promise(function(resolve, reject){
    
    pool.getConnection(function(err,connection) {
     
    
    
        connection.query("SELECT * FROM `student` WHERE studentNumber = ?;",params,function(err,data){
            connection.release();
    
            if(err) reject (err);
            else { 
                const students = data;
                resolve(students);
            }
     
        })
    
     })
    })
    }


module.exports = {
    getStudents,
    getStudentByID,
};
