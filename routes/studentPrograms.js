const express = require('express')
const queryBuilder = require('../db/queryBuilder');

var router = express.Router()

router.post("/students/programs", async function (req, res, next) {

    try {
        await queryBuilder.postQueeries(req);
        res.send("OK")
    } catch (err) {
        next(err)
    }
})

router.put("/students/programs", async function (req, res, next) {

    try {
      await queryBuilder.putByQueryParams(req);
      res.send("OK");
    } catch (err) {
      next(err)
  
    }
  })


module.exports = router;