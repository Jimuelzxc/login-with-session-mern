const db = require('../config/db')

module.exports = function (username, email, password) {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO Users (username, email, password) VALUES (?,?,?)"
        db.query(sql, [username, email, password], (error, result) => {
            error ? reject(error) : resolve(result)
        })
    })
}