const getQuerry = require('../Components/getQuerry');
const getId = require('../Components/getId');


async function add(dt) {
  let tbn,q;
  
  const id = await getId('months');
  tbn = `month_${id}`
  q = `INSERT INTO ${tbn} (DATE, MONEY, KIND, NOTE)
      VALUES('${dt.date}',${dt.MoneyInput},'${dt.kind}','${dt.NoteInput}');`

  await getQuerry(q);
  
  tbn = `month_${id}`;
  const id_dt = await getId(tbn);

  tbn = `week${dt.id}_${id}`
  q = `INSERT INTO ${tbn} (ID, DATE, MONEY, KIND, NOTE)
    VALUES(${id_dt},'${dt.date}',${dt.MoneyInput},'${dt.kind}','${dt.NoteInput}');` 
  
  await getQuerry(q);

}

module.exports = add;
