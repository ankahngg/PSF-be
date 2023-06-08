const connection = require('./connectDB.js')

function getUserId(userId) {
    return new Promise((resolve,reject) => {
        q = `SELECT ID FROM account WHERE USERID = '${userId}';`;
        connection.query(q, function (error, results, fields) {
            if(results.length) resolve(results[0].ID);
            else resolve(-1);
        })
      })
  }

module.exports = getUserId;

