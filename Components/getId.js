const connection = require('./connectDB.js')

function getId(tb) {
    return new Promise((resolve,reject) => {
      q = `SELECT MAX(ID) FROM ${tb}`;
      connection.query(q, function (error, results, fields) {
        resolve(results[0]['MAX(ID)']);
      })
    })
  }

module.exports = getId;

