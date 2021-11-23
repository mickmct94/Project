const express = require('express')
const queryBuilder = require('../db/queryBuilder');

var router = express.Router()

router.get("/programs/", async function (req, res, next) {
    
      try {
        const programs = await queryBuilder.getByQueryParams(req, queryBuilder.queryParamChecker);
        res.send(programs);
      } catch (err) {
        next(err)
      }
    
    })
    
    router.post("/programs/", async function (req, res, next) {
      
      try {
        await queryBuilder.postQueeries(req, queryBuilder.postprogramsQueryParamChecker);
      res.send("OK")
    } catch (err) {
        next(err)
      }
    })
    
    router.put("/programs/", async function (req, res, next) {
    
      try {
        await queryBuilder.queryParamChecker(req);
        res.send("OK");
      } catch (err) {
        next(err)
      }
    })

module.exports = router;