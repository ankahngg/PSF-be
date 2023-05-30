const express = require('express');
const getId = require('../Components/getId');
const getQuerry = require('../Components/getQuerry');
const router = express.Router();


async function makeAPI_months_data () {
  
  router.get(`/months_data`,async (req,res) => {
      let q,tbn,kq,id;  
      id = await getId('months');
      q = `SELECT * FROM months_data WHERE ID=${id};`
      kq = await getQuerry(q);
      res.json(kq);
    })
}
  
async function makeAPI(range,kind) {
  router.get(`/${range}_${kind}`,async (req,res) => {
      let q,tbn,kq,id;  
      id = await getId('months');
      q = `SELECT * FROM ${range}_${id} WHERE KIND = '${kind}';`;
      kq = await getQuerry(q);
      res.json(kq)
    })
}

makeAPI_months_data();
makeAPI('month','in');
makeAPI('month','out');
for(var i=1;i<=5;i++) 
  makeAPI(`week${i}`,'in'), 
  makeAPI(`week${i}`,'out');


module.exports = router;