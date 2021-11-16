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