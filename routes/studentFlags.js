const express = require('express')
const queryBuilder = require('../db/queryBuilder');

var router = express.Router()


router.get("/students/flags", async function (req, res, next) {

    try {
        const studentFlags = await queryBuilder.getByQueryParams(req);
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
      await queryBuilder.putByQueryParams(req);
      res.send("OK");
    } catch (err) {
      next(err)
  
    }
  })

module.exports = router;