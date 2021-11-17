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

const getStudentsQuery = function (studentQueryParams, moduleQueryParams, programQueryParams) {

    return new Promise(function (resolve, reject) {

        var query;
        //Get by student and module query params
        if (studentQueryParams.length > 0 && moduleQueryParams.length > 0) {

     query = 'SELECT student.studentNumber, student.firstName, student.lastName ,student.DOB, student.admitTermID, student.email, student.startLevel, student.currentLevel, studentModule.catalogNumber FROM student JOIN studentmodule ON student.studentNumber = studentmodule.studentNumber JOIN module ON studentmodule.catalogNumber = module.catalogNumber WHERE '+ studentQueryParams.join(' AND ') + " AND " + moduleQueryParams.join(' AND ');
      
        }
        //Get by student query params only
        else if (studentQueryParams.length > 0 && !moduleQueryParams.length && !programQueryParams.length) {

            query = 'SELECT * FROM student WHERE ' + studentQueryParams.join(' AND ');
       
        } 
        //Get by module query params only
        else if (moduleQueryParams.length > 0 && !studentQueryParams.length && !programQueryParams.length) {

            query = 'SELECT student.studentNumber, student.firstName, student.lastName ,student.DOB, student.admitTermID, student.email, student.startLevel, student.currentLevel FROM student JOIN studentmodule ON student.studentNumber = studentmodule.studentNumber JOIN module ON studentModule.catalogNumber = module.catalogNumber WHERE '  + moduleQueryParams.join(' AND ');
         
        }
        //Get by program query params only
        else if (programQueryParams.length > 0 &&  !moduleQueryParams.length && !studentQueryParams.length) {


            query = 'SELECT student.studentNumber, student.firstName, student.lastName ,student.DOB, student.admitTermID, student.email, student.startLevel, student.currentLevel, program.programCode FROM student JOIN studentProgram ON student.studentNumber = studentProgram.studentNumber JOIN program on studentProgram.programCode = program.programCode WHERE ' + programQueryParams.join(' AND ');
            console.log(query)
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

