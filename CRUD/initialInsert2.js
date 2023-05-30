const getQuerry = require('../Components/getQuerry');
const getId = require('../Components/getId');

async function initialInsert2() {
  const id = await getId('months')

  q = `SELECT * FROM months_data
    WHERE months_data.ID = ${id};
  `
  const res = await getQuerry(q);
        
  if(!res.length) {
    q = `INSERT INTO months_data
    VALUES (${id},0,0,0,0,0,0,0,0,0,0,0,0);
    `
    await getQuerry(q);
  }
    
}

module.exports = initialInsert2;
