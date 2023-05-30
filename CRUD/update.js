const { promise } = require('../Components/connectDB');
const getId = require('../Components/getId');
const getQuerry = require('../Components/getQuerry');

// call sum from $tbn to update into $colname in months_data table with $kind
async function updsum(tbn,colname,kind,id) {
  q = `SELECT SUM(MONEY) FROM ${tbn}
        WHERE ${tbn}.KIND = '${kind}';
  `;
  const res = await getQuerry(q);

  let sum = res[0]['SUM(MONEY)'];
  if(sum == null) sum = 0;

  q = `
        UPDATE months_data
        SET ${colname} = ${sum}
        WHERE ID = ${id};
      `
  await getQuerry(q);

}

async function update(th,kind) {
  const id = await getId('months');
  
  tbn = `week${th}_${id}`;
  const colname = `WEEK${th}_${kind}`;
  
  await promise.call([
    updsum(`week${th}_${id}`,`WEEK${th}_${kind}`,kind,id),
    updsum(`month_${id}`,`MONTH_${kind}`,kind,id)
  ])
  
}
module.exports = update;
