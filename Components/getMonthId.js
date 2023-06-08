const connection = require('./connectDB.js')

function getMonthId(userid,month,year) {
    return new Promise((resolve,reject) => {
        q = `SELECT * FROM ${userid}_months WHERE MONTH = '${month}' AND YEAR = '${year}';`;
        connection.query(q, function (error, results, fields) {
          if(results.length) resolve(results[0].ID);
          else resolve(-1);
        })
    })
  }

module.exports = getMonthId;

