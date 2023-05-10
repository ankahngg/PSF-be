const connection = require('./connectDB.js')

function getQuerry(query) {
    return new Promise((resolve,reject) => {
      connection.query(query, function (error, results, fields) {
        if (error) reject(error);
        else resolve(results);
      })
    })
  }

module.exports = getQuerry;
