const getQuerry = require('../Components/getQuerry');
const getUserId = require('../Components/getUserId');
const getMonthId = require('../Components/getMonthId');

function getWeek(date) {
  arr = date.split('-');
  return Math.ceil(1.0*(+arr[0])/7);
}

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

async function remove(dt) {
  let q1,q2;

  const userid = await getUserId(dt.id);
  const monthid = await getMonthId(userid,dt.month,dt.year);
  const th = getWeek(dt.date);
  dt.range = `week${th}`

  tbn = `${userid}_month_${monthid}`;
  q2 = `DELETE FROM ${tbn} WHERE ID = ${dt.ID};`
  
  
  tbn = `${userid}_${dt.range}_${monthid}`;
  q1 = `DELETE FROM ${tbn} WHERE ID = ${dt.ID};`
  
  await getQuerry(q1);
  await getQuerry(q2);

  // Update
  tbn = `${userid}_month_${monthid}`;
  sum = await getsum(tbn,dt);

  tbn = `${userid}_monthsdata`
  colname = `MONTH_${dt.kind}`
  await updatesum(tbn,colname,sum,monthid);


  tbn = `${userid}_${dt.range}_${monthid}`;
  sum = await getsum(tbn,dt);

  tbn = `${userid}_monthsdata`
  colname = `${dt.range}_${dt.kind}`
  await updatesum(tbn,colname,sum,monthid); 
  

}

module.exports = remove;
