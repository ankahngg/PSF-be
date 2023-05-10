const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
const port = 4000;
let q = '';
let tbn = '';


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '787899za',
  database: 'psf'
});

// START FUNCTION //
function sleep(ms) {
  return new Promise((resolve,reject) => {
     setTimeout(() => resolve(),ms);
  })
}

function createMainsTable() {
  return new Promise((resolve,reject) => {
    
    q = `CREATE TABLE IF NOT EXISTS months_data (
      ID INT,
      MONTH_IN INT,
      MONTH_OUT INT,
      WEEK1_IN INT,
      WEEK1_OUT INT,
      WEEK2_IN INT,
      WEEK2_OUT INT,
      WEEK3_IN INT,
      WEEK3_OUT INT,
      WEEK4_IN INT,
      WEEK4_OUT INT,
      WEEK5_IN INT,
      WEEK5_OUT INT
      );` 
      getQuerry(q)
        .then(() => {
          q = `CREATE TABLE IF NOT EXISTS months (
            ID INT AUTO_INCREMENT,
            MONTH VARCHAR(255),
            YEAR VARCHAR(255),
            PRIMARY KEY (ID)
            );`
          return getQuerry(q)
        })
        .then(() => resolve())
        // .catch(() => reject())
  })
}

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

function getId(tb) {
  return new Promise((resolve,reject) => {
    q = `SELECT MAX(ID) FROM ${tb}`;
    connection.query(q, function (error, results, fields) {
      if (error) reject(error);
      else resolve(results[0]['MAX(ID)']);
    })
  })
}

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

function makeAPI_months_data () {
  app.get(`/api/months_data`,(req,res) => {
    getId('months')
      .then((id) => {
        q = `SELECT * FROM months_data WHERE ID=${id};`
        return getQuerry(q);
      })
      .then((kq) => res.json(kq))
  })
}

function makeAPI(range,kind) {
  app.get(`/api/${range}_${kind}_tg`,(req,res) => {
    getId('months')
      .then((id) => {
        q = `SELECT * FROM ${range}_${id} WHERE KIND = '${kind}'
             ORDER BY ID DESC;
        `;
        return getQuerry(q);
      })
      .then((kq) => res.json(kq))
  })

  app.get(`/api/${range}_${kind}_giam`,(req,res) => {
    getId('months')
      .then((id) => {
        q = `SELECT * FROM ${range}_${id} WHERE KIND = '${kind}'
             ORDER BY MONEY DESC, ID DESC;
        `;
        return getQuerry(q);
      })
      .then((kq) => res.json(kq))
  })

  app.get(`/api/${range}_${kind}_tang`,(req,res) => {
    getId('months')
      .then((id) => {
        q = `SELECT * FROM ${range}_${id} WHERE KIND = '${kind}'
             ORDER BY MONEY ASC, ID DESC;
        `;
        return getQuerry(q);
      })
      .then((kq) => res.json(kq))
  })

}


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


function getQuerry(query) {
  return new Promise((resolve,reject) => {
    connection.query(query, function (error, results, fields) {
      if (error) reject(error);
      else resolve(results);
    })
  })
}

/// END FUNCTION ///


/// START INITIAL DATABASES ///

createMainsTable()
  .then(() => {return initialInsert1();})
  .then(() => {return initialInsert2();})
  .then(() => {return getId('months');})
  // CREATE TABLES
  .then((id) => {
    create('month',id);
    for(var i=1;i<=5;i++) create(`week${i}`,id);
    return id;
  })
  .catch((res) => {
    console.log("Sao ma loi duoc ?")
  })

/// END INITIAL DATABASES ///

/// MAKE API ///

makeAPI_months_data();
makeAPI('month','in');
makeAPI('month','out');
for(var i=1;i<=5;i++) 
  makeAPI(`week${i}`,'in'), 
  makeAPI(`week${i}`,'out');
  
/// HANDLE ADD REQUEST /// 
app.use(bodyParser.json());

app.post('/api/add',(req,res) => {
  const data = req;
  const dt = data.body;
  
  // CHECK EXIST
  
  add(dt)
    .then (() => {
      update(dt.id,dt.kind);
      return sleep(100);
    })
    .then(() => {
      res.send('User created successfully!');
    })
})

/// HANDLE REMOVE REQUEST ///

app.post('/api/remove',(req,res) => {
  const data = req;
  const dt = data.body;
  
  // CHECK EXIST
  
  remove(dt)
    .then ((th) => {
      update(th,dt.KIND);
      return sleep(100);
    })
    .then(() => {
      res.send('User created successfully!');
    })
})

/// START LAB ///
// const promise = new Promise((resolve,reject) => {
//   resolve();
// })

// function getVal() {
//   return new Promise((resolve,reject) => {
//     setTimeout(() => resolve(4),1000)
//   })
// }

// promise 
//   .then(() => {
//     const ID = 1;
//     return getVal()
//       .then((val) => {
//         return {
//           val : val,
//           id : ID
//         }
//       })
//   })
//   .then(({val,id}) => {
//     console.log(val,id);
//   })
  

/// END LAB ///


app.listen(port, () => console.log('success'))