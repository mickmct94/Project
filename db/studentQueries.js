const dbPool = require("./config");

const getStudentsbyStudentNumber = function (studentNumber) {

    return new Promise(function (resolve, reject) {

        var query = 'SELECT * FROM student WHERE studentNumber = ?;'
      

        dbPool.getConnection(function (err, connection) {

            if (err) reject(err);

            connection.query(query, studentNumber, function (err, data) {

                connection.release();

                if (err) reject(err);
                else {
                    const student = data;
                    resolve(student);
                }
            })
        })

    })
}

const getStudentsQuery = function (studentQueryParams, moduleQueryParams) {

    return new Promise(function (resolve, reject) {

        var query;

        if (studentQueryParams.length > 0 && moduleQueryParams.length > 0) {

     query = 'SELECT student.studentNumber, student.firstName, student.lastName ,student.DOB, student.admitTermID, student.email, student.startLevel, student.currentLevel, studentModule.catalogNumber FROM student JOIN studentmodule ON student.studentNumber = studentmodule.studentNumber WHERE ' + studentQueryParams.join(' AND ') + " AND " + moduleQueryParams.join(' AND ');
       console.log(query)
        }

        else if (studentQueryParams.length > 0 && !moduleQueryParams.length) {

            query = 'SELECT * FROM student WHERE ' + studentQueryParams.join(' AND ');
       
        } 
        else if (moduleQueryParams.length > 0 && !studentQueryParams.length) {

            query = 'SELECT student.studentNumber, student.firstName, student.lastName ,student.DOB, student.admitTermID, student.email, student.startLevel, student.currentLevel, studentModule.catalogNumber FROM student JOIN studentmodule ON student.studentNumber = studentmodule.studentNumber WHERE '  + moduleQueryParams.join(' AND ');
         
        }

        dbPool.getConnection(function (err, connection) {

            if (err) reject(err);

            connection.query(query, function (err, data) {

                connection.release();

                if (err) reject(err);
                else {
                    const students = data;
                    resolve(students);
                }
            })
        })

    })
}














module.exports = {
    getStudentsQuery,
    getStudentsbyStudentNumber
};

