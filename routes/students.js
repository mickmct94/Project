const { query } = require('express');
const express = require('express')
const db = require("../db/db.Config&Queries");

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

//GET STUDENTS BY STUDENT NUMBER
router.get("/students/:studentNumber", async function (req, res, next) {
  try {
    const students = await db.getStudentByID(req.params.studentNumber);
    res.send(students);
  } catch (err) {
    next(err)
  }
}
);

//GET STUDENTS BY QUERY PARAMS
router.get("/students", async function (req, res, next) {
  
const userInput = [];

if(req.query.studentNumber){
  userInput.push("studentNumber = " + "'" +req.query.studentNumber+ "'");
}
if(req.query.fName){
  userInput.push("firstName = " + "'" +req.query.fName+ "'");
}
if(req.query.lName){
  userInput.push("lastName = " + "'" +req.query.lName+ "'");
}
if(req.query.DOB){
  userInput.push("DOB = " + "'" +req.query.DOB+ "'");
}
if(req.query.admitTerm){
  userInput.push("admitTermID = "+ "'" +req.query.admitTerm+ "'");
}
if(req.query.email){
  userInput.push("email = "+ "'" +req.query.lName+ "'");
}

try {
  const students = await db.getStudentsQuery(userInput.map(function(element){
    return "student."+element;
  }));
  res.send(students);
} catch (err) {
  next(err)
}})



module.exports = router;






//GET STUDENTS BY MODULE
//GET STUDENTS BY A FLAG
//GET STUDENTS BY PROGRAM (TERM)
//GET STUDENTS BY ACADEMIC SUB PLAN
//GET STUDENTS BY CURRENT LEVEL
//GET STUDENTS BY ACADEMIC LOAD
//GET STUDENTS BY CAREER (UG,PGT,PGR)

//GET STUDENTS DETAILS
//GET STUDENTS PROGRAM
//GET STUDENTS MODULES
//GET STUDENTS FLAGS
//GET STUDENTS MODULE RESULT
//GET STUDENTS MODULE RESULTS (ALL MODULE RESULTS)
//GET STUDENTS MEETINGS

//GET MODULES
//GET MODULES BY CATALOGNUMBER
//GET MODULES BY ASSESSMENT TYPE
//GET MODULES BY PROGRAM (TERM)
//GET MODULES BY CORE
//GET MODULES BY SESSION

//GET MODULES DETAILS
//GET MODULES CATALOGNUMBER
//GET MODULES DESCRIPTION
//GET MODULES ASSESSMENT TYPE
//GET MODULES SESSION
//GET MODULES CORE

//GET MEETINGS
//GET MEETINGS BY STUDENT
//GET MEETINGS BY ATTENDEE (STAFF/ADMIN)
//GET MEETINGS BY DATE

//GET MEETINGS DETAILS
//GET MEETINGS
//GET MEETINGS OUTCOME
//GET MEETINGS ATTENDEES


//GET FLAGS

//GET PROGRAMS
//GET PRGORAMS BY PROGRAM CODE
//GET PROGRAMS BY ACADEMIC PLAN
//GET PROGRAMS BY SUB ACADEMIC PLAN
//GET PROGRAMS BY ACADEMIC ORG
//GET PROGRAMS BY SUBJECT
//GET PROGRAMS BY TERM
//GET PROGRAMS BY CAREER
//GET PROGRAMS BY ACADEMIC LOAD
//GET PROGRAMS BY CAMPUS

//GET PROGRAMS DETAILS
//GET PROGRAMS ACADEMIC PLAN
//GET PROGRAMS ACADEMIC SUB PLAN
//GET PROGRAMS ACADEMIC ORG
//GET PROGRAMS SUBJECT
//GET PROGRAMS TERM
//GET PROGRAMS CAREER
//GET PROGRAMS ACADEMIC LOAD
//GET PROGRAMS CAMPUS