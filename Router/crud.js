const express = require('express');
const add = require('../CRUD/add');
const remove = require('../CRUD/remove');
const update = require('../CRUD/update');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

let sleepTime = 100;

function sleep(ms) {
  return new Promise((resolve,reject) => {
    setTimeout(() => resolve(),ms);
  })
}

router.post('/add',async (req,res) => {
    const data = req;
    const dt = data.body;
    
    await add(dt);
    await update(dt.id,dt.kind);
    
    await sleep(sleepTime);
      
    res.send('User created successfully!');
      
})

router.post('/remove',async (req,res) => {
    const data = req;
    const dt = data.body;
    
    const th = await remove(dt);
  
    await update(th,dt.KIND);
  
    await sleep(sleepTime);
      
    res.send('User created successfully!');
  })

module.exports = router;