const { query } = require('express');
const express = require('express')
const studentQueryHandler = require("../db/studentQueries");

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
    const students = await studentQueryHandler.getStudentsByQueryParams(req, studentQueryHandler.getStudentsQueryParamChecker);
    res.send(students);
  } catch (err) {
    next(err)
  }

})

router.post("/students", async function (req, res, next) {
  
  try {
    await studentQueryHandler.postStudents(req, studentQueryHandler.postStudentsQueryParamChecker);
  } catch (err) {
    next(err)
  }
})

router.put("/students", async function (req, res, next) {

  try {
    await studentQueryHandler.getStudentsQueryParamChecker(req);
    res.send("OK");
  } catch (err) {
    next(err)
  }
})

module.exports = router;