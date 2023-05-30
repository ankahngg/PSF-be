const express = require('express');
const cors = require('cors');
require('dotenv').config()

const checkaccountRouter = require('./Router/checkaccount');
const crudRouter = require('./Router/crud');
const apiRouter = require('./Router/api');
const create = require('./CRUD/create')
const lab = require('./Components/lab');
const getId = require('./Components/getId');
const getQuerry = require('./Components/getQuerry');
const createMainsTable = require('./CRUD/createMainsTable');
const initialInsert1 = require('./CRUD/initialInsert1');
const initialInsert2 = require('./CRUD/initialInsert2');

const app = express();
app.use(cors());
const port = 4000;



/// START INITIAL DATABASES ///
async function init() {
  await createMainsTable();
  await initialInsert1();
  await initialInsert2();
  const id = await getId('months');

  create('month',id);
  for(var i=1;i<=5;i++) create(`week${i}`,id);
}

init();

/// END INITIAL DATABASES ///

app.use('/api',apiRouter);
  
app.use('/crud',crudRouter);

app.use('/checkaccount',checkaccountRouter);



/// START LAB ///

//lab();

/// END LAB ///

app.listen(port, () => console.log('success'))