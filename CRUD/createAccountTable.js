const getQuerry = require("../Components/getQuerry");

async function createAccountTable() {
    let q,tbn,res;

    q = `CREATE TABLE IF NOT EXISTS account(
        ID INT AUTO_INCREMENT,
        NAME VARCHAR(255),
        USERID VARCHAR(255),
        DAYJOIN VARCHAR(255),
        PRIMARY KEY (ID)
    );`

    await getQuerry(q);
    return;
}

module.exports = createAccountTable;