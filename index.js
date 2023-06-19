const express = require('express');
const cors = require('cors');
require('dotenv').config()

const checkaccountRouter = require('./Router/checkaccount');
const crudRouter = require('./Router/crud');
const apiRouter = require('./Router/api');
const createAccountTable = require('./CRUD/createAccountTable');
const lab = require('./Components/lab');

const app = express();
app.use(cors());
const port = 4000;


/// START INITIAL DATABASES ///
createAccountTable();

/// END INITIAL DATABASES ///

app.use('/api',apiRouter);
  
app.use('/crud',crudRouter);

app.use('/checkaccount',checkaccountRouter);


/// START LAB ///

// lab();

/// END LAB ///

app.listen(port, () => console.log('success'))