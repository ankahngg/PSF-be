const getQuerry = require('../Components/getQuerry');
const getUserId = require('../Components/getUserId');
const getMonthId = require('../Components/getMonthId');
const getId = require('../Components/getId');

const d = new Date();
const Year = d.getFullYear();
const Month = d.getMonth()+1;


async function getsum(tbn,kind) {
 
  q = `SELECT SUM(MONEY) as sum FROM ${tbn}
        WHERE ${tbn}.KIND = '${kind}';
  `;
  res = await getQuerry(q);

  sum = res[0]['sum'];
  if(sum == null) return 0;
  else return sum;
}

async function updatesum(tbn,colname,sum,monthid) {
  q = `
        UPDATE ${tbn}
        SET ${colname} = ${sum}
        WHERE ID = ${monthid};
      `
  await getQuerry(q);
}

function getWeek(date) {
  arr = date.split('-');
  return Math.ceil(1.0*(+arr[0])/7);
}

async function add(dt) {
  let tbn,q;
  
  const userid = await getUserId(dt.id);
  const monthid = await getMonthId(userid,dt.month,dt.year);
  const th = getWeek(dt.date)
  dt.range = `week${th}`;
  
  tbn = `${userid}_month_${monthid}`
  q = `INSERT INTO ${tbn} (ID, DATE, MONEY, KIND, NOTE)
      VALUES('${dt.noteId}','${dt.date}',${dt.MoneyInput},'${dt.kind}','${dt.NoteInput}');`
  await getQuerry(q);

  q = `INSERT INTO ${userid}_${dt.range}_${monthid} (ID, DATE, MONEY, KIND, NOTE)
    VALUES(${dt.noteId},'${dt.date}',${dt.MoneyInput},'${dt.kind}','${dt.NoteInput}');` 
    
  await getQuerry(q);

  /// update

  tbn = `${userid}_month_${monthid}`;
  sum = await getsum(tbn,dt.kind);

  tbn = `${userid}_monthsdata`
  colname = `MONTH_${dt.kind}`
  await updatesum(tbn,colname,sum,monthid);

  tbn = `${userid}_${dt.range}_${monthid}`;
  sum = await getsum(tbn,dt.kind);

  tbn = `${userid}_monthsdata`
  colname = `${dt.range}_${dt.kind}`
  await updatesum(tbn,colname,sum,monthid); 

  
}

module.exports = add;
