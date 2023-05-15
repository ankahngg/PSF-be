const getQuerry = require('../Components/getQuerry');

async function createMainsTable() {
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
  await getQuerry(q)

  q = `CREATE TABLE IF NOT EXISTS months (
    ID INT AUTO_INCREMENT,
    MONTH VARCHAR(255),
    YEAR VARCHAR(255),
    PRIMARY KEY (ID)
    );`

  await getQuerry(q)

  return new Promise(resolve => resolve())
  }

module.exports = createMainsTable;