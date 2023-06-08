const getQuerry = require('./getQuerry.js');
const getUserId = require('./getUserId')
const getId = require('./getId');


async function lab() {
    q = `SELECT COUNT(ID) AS sl FROM 1_month_1;`
    res = await getQuerry(q);
  
    const id = res[0]['sl'];
    console.log(id);
}

module.exports = lab;
