const getId = require('../Components/getId');
const getQuerry = require('../Components/getQuerry');

function update(th,kind) {
    return new Promise((resolve,reject) => {
      getId('months')
        .then((id) => {
          tbn = `week${th}_${id}`;
          q = `SELECT SUM(MONEY) FROM ${tbn}
                WHERE ${tbn}.KIND = '${kind}';
          `
          getQuerry(q)
            .then((res) => {
              const colname = `WEEK${th}_${kind}`;
              let sum = res[0]['SUM(MONEY)'];
              if(sum == null) sum = 0;
              
             
              q = `
                UPDATE months_data
                SET ${colname} = ${sum}
                WHERE ID = ${id};
              `
              return getQuerry(q);
            })
            .then(() => resolve())
        })
    
        getId('months')
          .then((id) => {
            tbn = `month_${id}`;
            q = `SELECT SUM(MONEY) FROM ${tbn}
                  WHERE ${tbn}.KIND = '${kind}';
            `
            getQuerry(q)
              .then((res) => {
                const colname = `MONTH_${kind}`;
                let sum = res[0]['SUM(MONEY)'];
                if(sum == null) sum = 0;
                q = `
                  UPDATE months_data
                  SET ${colname} = ${sum}
                  WHERE ID = ${id};
                `
                return getQuerry(q);
              })
              .then(() => resolve())
          })
  
    })
  }
  module.exports = update;
