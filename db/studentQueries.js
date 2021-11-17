const dbPool = require("./config");


const getStudentsQueryBuilder = function (studentQueryParams, moduleQueryParams, programQueryParams) {

    var query;
        
    //Get by student and module query params
     query = "SELECT student.studentNumber, student.firstName, student.lastName ,student.DOB, student.admitTermID, student.email, student.startLevel, student.currentLevel, studentModule.catalogNumber, program.programCode"
     + " FROM student JOIN studentmodule ON student.studentNumber = studentmodule.studentNumber JOIN module ON studentmodule.catalogNumber = module.catalogNumber JOIN program ON module.programCode = program.programCode WHERE "
     + studentQueryParams.join(' AND ')
    + (moduleQueryParams.length > 0 ? " AND " + moduleQueryParams.join(' AND ') : "" )
   + (programQueryParams.length > 0 ? " AND " + programQueryParams.join(' AND ') : "" )
    console.log(query)
    return query;
}

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

const getStudentsByQueryParams = function (studentQueryParams, moduleQueryParams, programQueryParams, getStudentsQueryBuilder) {

    query = getStudentsQueryBuilder(studentQueryParams, moduleQueryParams, programQueryParams);
  
    return new Promise(function (resolve, reject) {

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
    getStudentsByQueryParams,
    getStudentsbyStudentNumber,
    getStudentsQueryBuilder
};

