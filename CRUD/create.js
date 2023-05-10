const getQuerry = require('../Components/getQuerry');

function create(range,id) {
    q = `CREATE TABLE IF NOT EXISTS ${range}_${id} (
      ID INT AUTO_INCREMENT,
      DATE VARCHAR(255),
      MONEY INT,
      KIND VARCHAR(255),
      NOTE VARCHAR(255),
      PRIMARY KEY (ID)
    );`
    
    getQuerry(q);
  }

module.exports = create;
