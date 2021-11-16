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