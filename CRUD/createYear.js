const getQuerry = require("../Components/getQuerry");

function create(range,userid,monthid) {
    q = `CREATE TABLE IF NOT EXISTS ${userid}_${range}_${monthid} (
      ID INT AUTO_INCREMENT,
      DATE VARCHAR(255),
      MONEY INT,
      KIND VARCHAR(255),
      NOTE VARCHAR(255),
      PRIMARY KEY (ID)
    );`
    
    getQuerry(q);
  }

async function createYear(year,userid) {

    q = `SELECT * FROM ${userid}_months 
        WHERE YEAR = '${year}';
    `
    res = await getQuerry(q);

    if(res.length) return;

    for(let i =1; i<=12;i++) {
        /// INITIAL INSERT ///
        q = `INSERT INTO ${userid}_months(MONTH,YEAR)
            VALUES ('${i}','${year}');`
        res = await getQuerry(q);

        monthid = await getMonthId(userid,i,year);
        q = `INSERT INTO ${userid}_monthsdata
        VALUES (${monthid},0,0,0,0,0,0,0,0,0,0,0,0);
        `
        await getQuerry(q);

        /// CREATE SUB TABLES /// 
        create('month',userid,monthid);
        for(let j=1;j<=5;j++) create(`week${j}`,userid,monthid);
    }
}

module.exports = createYear;