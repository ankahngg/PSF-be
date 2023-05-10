const getQuerry = require('../Components/getQuerry');

function initialInsert1() {
    return new Promise((resolve,reject) => {
  
      const date = new Date();
      const month = date.getMonth()+1; 
      const year = date.getFullYear();
    
      q = `SELECT * FROM months
           WHERE (months.MONTH = ${month} AND months.YEAR = ${year});
      `
    
      getQuerry(q)
        .then((res) => {
          if(!res.length) {
            q = `
              INSERT INTO months(MONTH, YEAR) 
              VALUES ('${month}','${year}');
            `
            return getQuerry(q); 
          }
        })
        .then(() => resolve())
        // .catch(() => reject())
  
      
    })
  }

module.exports = initialInsert1;
