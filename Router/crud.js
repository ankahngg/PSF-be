const express = require('express');
const add = require('../CRUD/add');
const remove = require('../CRUD/remove');
const update = require('../CRUD/update');
const createMainsTable = require('../CRUD/createMainsTable')
const addUser = require('../CRUD/addUser')

const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

let sleepTime = 2000;

function sleep(ms) {
  return new Promise((resolve,reject) => {
    setTimeout(() => resolve(),ms);
  })
}

router.post('/add',async (req,res) => {
    const data = req;
    const dt = data.body;
    
    await add(dt);
    //await sleep(sleepTime);
    
    res.send('User created successfully!');
      
})

router.post('/remove',async (req,res) => {
    const data = req;
    const dt = data.body;
    
    await remove(dt);
      
    //await sleep(1000);
    res.send('User created successfully!');
  })

router.post('/initialCreate', async (req,res) => {
  const data = req;
  const user = data.body;

  await addUser(user);

  res.send("OK");

})

module.exports = router;