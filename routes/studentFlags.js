const express = require('express')
const queryBuilder = require('../queryBuilders/queryBuilder');
const paramChecker = require("../queryBuilders/paramChecker");

var router = express.Router()


router.get("/students/flags", async function (req, res, next) {

    try {
        const studentFlags = await queryBuilder.getByQueryParams(req, paramChecker);
        res.send(studentFlags);
    } catch (err) {
        next(err)
    }

})


router.post("/students/flags", async function (req, res, next) {

    try {
        await queryBuilder.postQueeries(req);
        res.send("OK")
    } catch (err) {
        next(err)
    }
})

router.put("/students/flags", async function (req, res, next) {

    try {
      await queryBuilder.putByQueryParams(req, paramChecker);
      res.send("OK");
    } catch (err) {
      next(err)
  
    }
  })

module.exports = router;