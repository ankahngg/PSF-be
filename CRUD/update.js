const getUserId = require('../Components/getUserId');
const getMonthId = require('../Components/getMonthId');
const getQuerry = require('../Components/getQuerry');

async function getsum(tbn,dt) {
 
  q = `SELECT SUM(MONEY) as sum FROM ${tbn}
        WHERE ${tbn}.KIND = '${dt.kind}';
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

// const dt = {
//   year 
//   month 
//   week 
//  range
//   id 
//   date
//   kind 
//   MoneyInput 
//   NoteInput
// }

async function update(dt) {
  const userid = await getUserId(dt.id);
  const monthid = await getMonthId(userid,dt.month,dt.year);

  tbn = `${userid}_month_${monthid}`;
  sum = await getsum(tbn,dt);

  tbn = `${userid}_monthsdata`
  colname = `MONTH_${dt.kind}`
  await updatesum(tbn,colname,sum,monthid);

  ////////

  tbn = `${userid}_${dt.range}_${monthid}`;
  sum = await getsum(tbn,dt);

  tbn = `${userid}_monthsdata`
  colname = `${dt.range}_${dt.kind}`
  await updatesum(tbn,colname,sum,monthid); 
  
}
module.exports = update;
