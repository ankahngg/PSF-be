const getQuerry = require('../Components/getQuerry');

async function initialInsert1() {
  const date = new Date();
  const month = date.getMonth()+1; 
  const year = date.getFullYear();

  q = `SELECT * FROM months
       WHERE (months.MONTH = ${month} AND months.YEAR = ${year});`
  const res = await getQuerry(q);

  if(!res.length) {
    q = `
      INSERT INTO months(MONTH, YEAR) 
      VALUES ('${month}','${year}');`
    await getQuerry(q);
  }
  
}

module.exports = initialInsert1;
