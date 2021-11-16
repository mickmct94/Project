
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