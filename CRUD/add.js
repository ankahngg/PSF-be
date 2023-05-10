const getQuerry = require('../Components/getQuerry');
const getId = require('../Components/getId');


function add(dt) {
    return new Promise((resolve,reject) => {
  
      getId('months')
        .then((id) => {
          tbn = `month_${id}`
          q = `INSERT INTO ${tbn} (DATE, MONEY, KIND, NOTE)
            VALUES('${dt.date}',${dt.MoneyInput},'${dt.kind}','${dt.NoteInput}');
          `
          return getQuerry(q) .then(() => {return id})
          
        })
        .then((id) => {
            tbn = `month_${id}`
            return getId(tbn) 
              .then((res) => {
                return {
                  id_tb : id,
                  id_dt : res
                }
              })
        })
        .then(({id_tb,id_dt}) => {
          tbn = `week${dt.id}_${id_tb}`
          q = `INSERT INTO ${tbn} (ID, DATE, MONEY, KIND, NOTE)
            VALUES(${id_dt},'${dt.date}',${dt.MoneyInput},'${dt.kind}','${dt.NoteInput}');
          ` 
          return getQuerry(q);
        })
        .then(() => resolve())
        .catch((err) => console.log(err))
    })
  }

module.exports = add;
