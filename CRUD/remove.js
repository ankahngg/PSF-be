const getQuerry = require('../Components/getQuerry');
const getId = require('../Components/getId');


async function remove(dt) {
  let q1,q2;

  function getday(str) {
    const arr = str.split("-");
    const day = +arr[0];
    const th = Math.ceil(day / 7);
    return th;
  }

  const id = await getId('months');

  const th = getday(dt.DATE);
  tbn = `week${th}_${id}`;
  q1 = `DELETE FROM ${tbn} WHERE ID = ${dt.ID};`
 
  tbn = `month_${id}`;
  q2 = `DELETE FROM ${tbn} WHERE ID = ${dt.ID};`
 
  await Promise.all([
    getQuerry(q1),
    getQuerry(q2)
  ]);

  return new Promise(resolve => resolve(th));
}

module.exports = remove;
