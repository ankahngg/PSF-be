const express = require('express');
const getId = require('../Components/getId');
const getQuerry = require('../Components/getQuerry');
const getMonthId = require('../Components/getMonthId');
const getUserId = require('../Components/getUserId');

const router = express.Router();


  
router.get(`/monthsdata`,async (req,res) => {
    const id = req.query.id;
    const year = req.query.year;
    const month = req.query.month;
    userid = await getUserId(id);

    let q,tbn,kq;

    const monthid = await getMonthId(userid,month,year);
    if(monthid == -1) res.json("khong co du lieu");
    else {
      q = `SELECT * FROM ${userid}_monthsdata WHERE ID=${monthid};`
      kq = await getQuerry(q);
      res.json(kq);
    }
  })

  

router.get(`/`,async (req,res) => {
 
    const id = req.query.id;
    const year = req.query.year;
    const month = req.query.month;
    // const range = req.query.range;
    // const kind = req.query.kind;

    const userid = await getUserId(id);
    let q,tbn,kq;  
    const monthid = await getMonthId(userid,month,year);
    if(monthid == -1) res.json("khong co du lieu");
    else {
        q = `SELECT * FROM ${userid}_month_${monthid};`;
        kq = await getQuerry(q);
        res.json(kq);
    }
  })

  router.get(`/test`,async (req,res) => {
    res.send(`<h1>cung ra gi day</h1>`)
    
  })


module.exports = router;