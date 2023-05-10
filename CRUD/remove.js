const getQuerry = require('../Components/getQuerry');
const getId = require('../Components/getId');


function remove(dt) {
    return new Promise((resolve,reject) => {
  
      function getday(str) {
        const arr = str.split("-");
        const day = +arr[0];
        const th = Math.ceil(day / 7);
        return th;
      }
  
      getId('months')
        .then((id) => {
          const th = getday(dt.DATE);
          tbn = `week${th}_${id}`;
          q = `DELETE FROM ${tbn} WHERE ID = ${dt.ID};`
          return getQuerry(q) 
            .then(() => {return id})
          
        })
        .then((id) => {
          tbn = `month_${id}`;
          q = `DELETE FROM ${tbn} WHERE ID = ${dt.ID};`
          return getQuerry(q);
        })
        .then(() => resolve(getday(dt.DATE)))
    })
  }

  module.exports = remove;
