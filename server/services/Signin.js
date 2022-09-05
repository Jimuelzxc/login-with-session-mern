const db = require('../config/db')

module.exports = function (username) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Users WHERE username = ? OR email = ?"
        db.query(sql, [username, username], (error, result) => {
            error ? reject(error) : resolve(result)
        })
    })
}