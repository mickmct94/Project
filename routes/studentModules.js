const express = require('express')
const queryBuilder = require('../db/queryBuilder');

var router = express.Router()

router.get("/students/modules", async function (req, res, next) {

  try {
      const studentModules = await queryBuilder.getByQueryParams(req);
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
      await queryBuilder.putByQueryParams(req);
      res.send("OK");
    } catch (err) {
      next(err)
  
    }
  })

module.exports = router;