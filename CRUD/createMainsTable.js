const getQuerry = require('../Components/getQuerry');

function createMainsTable() {
    return new Promise((resolve,reject) => {
      
      q = `CREATE TABLE IF NOT EXISTS months_data (
        ID INT,
        MONTH_IN INT,
        MONTH_OUT INT,
        WEEK1_IN INT,
        WEEK1_OUT INT,
        WEEK2_IN INT,
        WEEK2_OUT INT,
        WEEK3_IN INT,
        WEEK3_OUT INT,
        WEEK4_IN INT,
        WEEK4_OUT INT,
        WEEK5_IN INT,
        WEEK5_OUT INT
        );` 
        getQuerry(q)
          .then(() => {
            q = `CREATE TABLE IF NOT EXISTS months (
              ID INT AUTO_INCREMENT,
              MONTH VARCHAR(255),
              YEAR VARCHAR(255),
              PRIMARY KEY (ID)
              );`
            return getQuerry(q)
          })
          .then(() => resolve())
          // .catch(() => reject())
    })
  }

module.exports = createMainsTable;