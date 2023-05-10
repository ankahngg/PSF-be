const getQuerry = require('../Components/getQuerry');
const getId = require('../Components/getId');

function initialInsert2() {
    return new Promise((resolve,reject) => {
  
      getId('months')
        .then(id => {
          q = `SELECT * FROM months_data
            WHERE months_data.ID = ${id};
          `
          
          getQuerry(q)
            .then(res => {
              if(!res.length) {
                q = `INSERT INTO months_data
                VALUES (${id},0,0,0,0,0,0,0,0,0,0,0,0);
                `
                return getQuerry(q);
              }
            })
            .then(() => resolve())
            // .catch(() => reject())
  
        })
      
    })
  }

module.exports = initialInsert2;
