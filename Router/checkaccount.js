const express = require('express');
const checkaccount = require('../account/checkaccount')
const router = express.Router();

router.post('/',async (req,res) => {
  
    const data = req;
    const dt = data.body;
    
    const mess = await checkaccount(dt);
    res.send(mess);
  })

module.exports = router;