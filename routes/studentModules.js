const express = require('express')
const queryBuilder = require('../queryBuilders/queryBuilder');
const paramChecker = require("../queryBuilders/paramChecker");

var router = express.Router()

router.get("/students/modules", async function (req, res, next) {

  try {
      const studentModules = await queryBuilder.getByQueryParams(req, paramChecker);
      res.send(studentModules);
  } catch (err) {
      next(err)
  }

})

router.post("/students/modules", async function (req, res, next) {

    try {
        await queryBuilder.postQueeries(req);
        res.send("OK")
    } catch (err) {
        next(err)
    }
})

router.put("/students/modules", async function (req, res, next) {

    try {
      await queryBuilder.putByQueryParams(req, paramChecker);
      res.send("OK");
    } catch (err) {
      next(err)
  
    }
  })

module.exports = router;