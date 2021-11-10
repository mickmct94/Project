const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "A4wW[)nn@R(NH9VP",
    database: "projectpractice"
})

const getStudentByID = function (params) {

    return new Promise(function (resolve, reject) {

        pool.getConnection(function (err, connection) {

            connection.query("SELECT * FROM `student` WHERE studentNumber = ?;", params, function (err, data) {
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

const getStudentsQuery = function (queryConditions) {


    return new Promise(function (resolve, reject) {

        var query;

        if (!Array.isArray(queryConditions) || !queryConditions.length) {
            query = 'SELECT * FROM student;'
        } else {
            query = 'SELECT * FROM student WHERE ' + queryConditions.join(' AND ');
        }

        pool.getConnection(function (err, connection) {

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

const getModulesByCatlogNumber = function (params) {

    return new Promise(function (resolve, reject) {

        pool.getConnection(function (err, connection) {

            if (err) reject(err)

            connection.query("SELECT * FROM module WHERE catalogNumber = ?", params, function (err, data) {
                connection.release();

                if (err) reject(err);
                else {
                    const modules = data;
                    resolve(modules);
                }

            })

        })
    })
}

const getModules = function (queryConditions) {
    return new Promise(function (resolve, reject) {

        var query;

        if (!Array.isArray(queryConditions) || !queryConditions.length) {
            query = 'SELECT * FROM module;'
        } else {
            query = 'SELECT * FROM module WHERE ' + queryConditions.join(' AND ');
        }
console.log(query)
        pool.getConnection(function (err, connection) {

            if (err) reject(err);

            connection.query(query, function (err, data) {

                connection.release();

                if (err) reject(err);
                else {
                    const modules = data;
                    resolve(modules);
                }
            })
        })

    })
}

const getFlags = function () {

    return new Promise(function (resolve, reject) {

        pool.getConnection(function (err, connection) {

            if (err) reject(err)

            connection.query("SELECT * FROM flag", function (err, data) {
                connection.release();

                if (err) reject(err);
                else {
                    const modules = data;
                    resolve(modules);
                }

            })

        })
    })
}

const getFlagsByID = function (params) {

    return new Promise(function (resolve, reject) {

        pool.getConnection(function (err, connection) {

            if (err) reject(err)

            connection.query("SELECT * FROM flag WHERE flagID = ?", params, function (err, data) {
                connection.release();

                if (err) reject(err);
                else {
                    const modules = data;
                    resolve(modules);
                }

            })

        })
    })
}

const getPrograms = function () {

    return new Promise(function (resolve, reject) {

        pool.getConnection(function (err, connection) {

            if (err) reject(err)

            connection.query("SELECT * FROM program", function (err, data) {
                connection.release();

                if (err) reject(err);
                else {
                    const programs = data;
                    resolve(programs);
                }

            })

        })
    })
}

const getProgramsByCode = function (params) {

    return new Promise(function (resolve, reject) {

        pool.getConnection(function (err, connection) {

            if (err) reject(err)

            connection.query("SELECT * FROM program WHERE programCode = ?", params, function (err, data) {
                connection.release();

                if (err) reject(err);
                else {
                    const programs = data;
                    resolve(programs);
                }

            })

        })
    })
}

const getMeeetings = function () {

    return new Promise(function (resolve, reject) {

        pool.getConnection(function (err, connection) {

            if (err) reject(err)

            connection.query("SELECT * FROM meeting", function (err, data) {
                connection.release();

                if (err) reject(err);
                else {
                    const meetings = data;
                    resolve(meetings);
                }

            })

        })
    })
}

const getMeeetingsByID = function (params) {

    return new Promise(function (resolve, reject) {

        pool.getConnection(function (err, connection) {

            if (err) reject(err)

            connection.query("SELECT * FROM meeting WHERE meetingID = ?", params, function (err, data) {
                connection.release();

                if (err) reject(err);
                else {
                    const meetings = data;
                    resolve(meetings);
                }

            })

        })
    })
}
module.exports = {
    getStudentByID,
    getModules,
    getModulesByCatlogNumber,
    getFlags,
    getFlagsByID,
    getPrograms,
    getProgramsByCode,
    getMeeetings,
    getMeeetingsByID,
    getStudentsQuery
};

