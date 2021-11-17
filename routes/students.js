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

//GET STUDENTS BY STUDENT NUMBER
router.get("/students/:studentNumber", async function (req, res, next) {
  try {
    const students = await studentQueryHandler.getStudentsbyStudentNumber(req.params.studentNumber);
    res.send(students);
  } catch (err) {
    next(err)
  }
}
);

//GET STUDENTS BY QUERY PARAMS
router.get("/students", async function (req, res, next) {

  const returnInfo = [req.query.studentDetails, req.query.studentAcademicReacord];

  const addStudentQueryParams = function (queryParams) {

    const studentQueryParams = [req.query.studentNumber, req.query.fName, req.query.lName, req.query.DOB, req.query.admitTerm, req.query.email];

    const studentSQLStrings = [
      "student.studentNumber = " + "'" + req.query.studentNumber + "'",
      "student.firstName = " + "'" + req.query.fName + "'",
      "student.lastName = " + "'" + req.query.lName + "'",
      "student.DOB = " + "'" + req.query.DOB + "'",
      "student.admitTermID = " + "'" + req.query.admitTerm + "'",
      "student.email = " + "'" + req.query.email + "'"
    ]

    const studentParamsfiltered = studentSQLStrings.filter(function (element, index) {

      if (!studentQueryParams[index]) { return false } else return true;
    })

    return studentParamsfiltered;

  }



  const addModuleQueryParams = function (queryParams) {

    const moduleQueryParams = [req.query.moduleCatalogNumber, req.query.moduleDescription, req.query.moduleLevel, req.query.moduleAssessmentType, req.query.moduleSession, req.query.moduleCore, req.query.moduleTerm, req.query.moduleSubject];

    const moduleSQLStrings = [
      "module.catalogNumber = " + "'" + req.query.moduleCatalogNumber + "'",
      "module.moduleDescription = " + "'" + req.query.moduleDescription + "'",
      "module.moduleLevel = " + "'" + req.query.moduleLevel + "'",
      "module.assessmentTypeID = " + "'" + req.query.moduleAssessmentType + "'",
      "module.sessionID = " + "'" + req.query.moduleSession + "'",
      "student.core = " + "'" + req.query.moduleCore + "'",
      "student.units = " + "'" + req.query.moduleTerm + "'",
      "student.moduleTermID = " + "'" + req.query.moduleTerm + "'"
    ]

    const moduleParamsfiltered = moduleSQLStrings.filter(function (element, index) {

      if (!moduleQueryParams[index]) { return false } else return true;
    })

    return moduleParamsfiltered;

  }


  const addProgramQueryParams = function (queryParams) {

    const programQueryParams = [req.query.programCode, req.query.programDescription, req.query.programAcademicLoad, req.query.programCareer, req.query.programAcademicOrg, req.query.programAcademicPlan, req.query.programStartTerm, req.query.programCampus];

    const programSQLStrings = [
      "program.programCode = " + "'" + req.query.programCode + "'",
      "program.programDescription = " + "'" + req.query.programDescription + "'",
      "program.academicLoadID = " + "'" + req.query.programAcademicLoad + "'",
      "program.careerID = " + "'" + req.query.programCareer + "'",
      "program.academicOrgID = " + "'" + req.query.programAcademicOrg + "'",
      "program.academicPlanID = " + "'" + req.query.programAcademicPlan + "'",
      "program.startTermID = " + "'" + req.query.programStartTerm + "'",
      "program.campusID = " + "'" + req.query.programCampus + "'"
    ]

    const programParamsfiltered = programSQLStrings.filter(function (element, index) {

      if (!programQueryParams[index]) { return false } else return true;
    })

    return programParamsfiltered;

  }

  const studentQueryParams = addStudentQueryParams(req.query);
  const moduleQueryParams = addModuleQueryParams(req.query);
  const programQueryParams = addProgramQueryParams(req.query);

  try {
    const students = await studentQueryHandler.getStudentsByQueryParams(studentQueryParams, moduleQueryParams, programQueryParams, studentQueryHandler.getStudentsQueryBuilder);
    res.send(students);
  } catch (err) {
    next(err)
  }
})

module.exports = router;






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