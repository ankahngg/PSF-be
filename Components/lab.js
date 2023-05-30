const getQuerry = require('./getQuerry.js');

async function lab() {
    let q,tbn,res;
    
    q = `SELECT * FROM account WHERE EMAIL = 'khang@gmail.co';`
    
    res = await getQuerry(q);

    console.log(res);
}

module.exports = lab;
