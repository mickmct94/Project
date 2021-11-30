const { query } = require('express');
const express = require('express');
const queryBuilder = require('../db/queryBuilder');

var router = express.Router()

//error handler for put,post,delete
function asyncErrHandler(callBack) {
  return async function (req, res, next) {
    try {
      await callBack(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}

//GET STUDENTS BY QUERY PARAMS
router.get("/students", async function (req, res, next) {

  try {
    const students = await queryBuilder.getByQueryParams(req, queryBuilder.queryParamChecker);
    res.send(students);
  } catch (err) {
    next(err)
  }

})

router.post("/students", async function (req, res, next) {

  try {
    await queryBuilder.postQueeries(req);
    res.send("OK")
  } catch (err) {
    next(err)

  }
})

router.put("/students", async function (req, res, next) {

  try {
    await queryBuilder.putByQueryParams(req, queryBuilder.putQueryBuilder);
    res.send("OK");
  } catch (err) {
    next(err)

  }
})

module.exports = router;