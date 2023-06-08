const getMonthId = require('../Components/getMonthId');
const getQuerry = require('../Components/getQuerry');
const getUserId = require('../Components/getUserId');
const createYear = require('./createYear');

async function createMainsTable(userId) {
  userid = await getUserId(userId);

  q = `SHOW TABLES LIKE '${userid}_monthsdata'`; 
  res = await getQuerry(q);
  
  if(res.length) return;
  /// CREATE MAIN TABLES///

  q = `CREATE TABLE IF NOT EXISTS ${userid}_monthsdata (
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

  q = `CREATE TABLE IF NOT EXISTS ${userid}_months (
    ID INT AUTO_INCREMENT,
    MONTH VARCHAR(255),
    YEAR VARCHAR(255),
    PRIMARY KEY (ID)
    );`

  await getQuerry(q)

  /////////////////
  const date = new Date();
  const year = date.getFullYear();

  createYear(year,userid);
  
}

module.exports = createMainsTable;