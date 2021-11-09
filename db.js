const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "pmcteggart01",
    password: "L4wvRvJ3DQyNvRH6",
    database: "pmcteggart01"
})


const getStudents = function () {

    return new Promise(function (resolve, reject) {

        pool.getConnection(function (err, connection) {

            if (err) reject(err)

            connection.query("SELECT * FROM student", function (err, data) {
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

const getModules = function () {

    return new Promise(function (resolve, reject) {

        pool.getConnection(function (err, connection) {

            if (err) reject(err)

            connection.query("SELECT * FROM module", function (err, data) {
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
    getStudents,
    getStudentByID,
    getModules,
    getModulesByCatlogNumber,
    getFlags,
    getFlagsByID,
    getPrograms,
    getProgramsByCode,
    getMeeetings,
    getMeeetingsByID
};
