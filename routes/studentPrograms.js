const express = require('express')
const queryBuilder = require('../queryBuilders/queryBuilder');
const paramChecker = require("../queryBuilders/paramChecker");

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
      await queryBuilder.putByQueryParams(req, paramChecker);
      res.send("OK");
    } catch (err) {
      next(err)
  
    }
  })


module.exports = router;