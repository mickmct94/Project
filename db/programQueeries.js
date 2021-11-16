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