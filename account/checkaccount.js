const getQuerry = require('../Components/getQuerry');
const getId = require('../Components/getId');

async function checkaccount(dt) {
    let tbn,q,res,mess;

    q = `SELECT * FROM account WHERE EMAIL = '${dt.Email}';`

    res = await getQuerry(q);

    if(res.length == 0)  mess = 'Email chưa tồn tại';
    else if(dt.Password != res[0].PASSWORD) mess = 'Mật khẩu không chính xác';
    else mess = 'correct';

    return new Promise(resolve => resolve(mess));
}

module.exports = checkaccount;