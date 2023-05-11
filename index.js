const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()


const getId = require('./Components/getId');
const getQuerry = require('./Components/getQuerry');
const add = require('./CRUD/add');
const create = require('./CRUD/create');
const remove = require('./CRUD/remove');
const update = require('./CRUD/update');
const createMainsTable = require('./CRUD/createMainsTable');
const initialInsert1 = require('./CRUD/initialInsert1');
const initialInsert2 = require('./CRUD/initialInsert2');

const app = express();
app.use(cors());
const port = 4000;
let q = '';
let tbn = '';

// START FUNCTION //

function sleep(ms) {
  return new Promise((resolve,reject) => {
    setTimeout(() => resolve(),ms);
  })
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
  

app.get('/testserver',(req,res) => {
  res.send("test server is working");
})
/// END LAB ///

app.listen(port, () => console.log('success'))