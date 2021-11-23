const express = require('express')
const queryBuilder = require('../db/queryBuilder');

var router = express.Router()

router.get("/modules/", async function (req, res, next) {
    
      try {
        const modules = await queryBuilder.getByQueryParams(req, queryBuilder.queryParamChecker);
        res.send(modules);
      } catch (err) {
        next(err)
      }
    
    })
    
    router.post("/modules/", async function (req, res, next) {
      
      try {
        await queryBuilder.postQueeries(req, queryBuilder.postmodulesQueryParamChecker);
      res.send("OK")
    } catch (err) {
        next(err)
      }
    })
    
    router.put("/modules/", async function (req, res, next) {
    
      try {
        await queryBuilder.queryParamChecker(req);
        res.send("OK");
      } catch (err) {
        next(err)
      }
    })

module.exports = router;