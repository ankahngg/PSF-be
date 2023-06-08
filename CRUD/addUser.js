const getQuerry = require('../Components/getQuerry');
const getUserId = require('../Components/getUserId');
const createMainsTable = require('./createMainsTable');
const createYear = require('./createYear');
const date = new Date();
const Dateth = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();

async function addUser(user) {
    q = `SELECT * FROM account WHERE USERID = '${user.id}'`;
    res = await getQuerry(q);
    
    if(!res.length) {
        q = `INSERT INTO account (NAME,USERID,DAYJOIN)
        VALUES('${user.name}','${user.id}','${Dateth}');
        `
        await getQuerry(q);
        await createMainsTable(user.id);
    }
    else {
        userid = await getUserId(user.id);
        createYear(date.getFullYear(),userid);
    }
    
    return;
}

module.exports = addUser;