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

  const userInput = [];
  const moduleUserInput = [];
  const programUserInput = [];

  const addStudentQueryParams = function (userInput) {
    if (req.query.studentNumber) {
      userInput.push("student.studentNumber = " + "'" + req.query.studentNumber + "'");
    }
    if (req.query.fName) {
      userInput.push("student.firstName = " + "'" + req.query.fName + "'");
    }
    if (req.query.lName) {
      userInput.push("student.lastName = " + "'" + req.query.lName + "'");
    }
    if (req.query.DOB) {
      userInput.push("student.DOB = " + "'" + req.query.DOB + "'");
    }
    if (req.query.admitTerm) {
      userInput.push("student.admitTermID = " + "'" + req.query.admitTerm + "'");
    }
    if (req.query.email) {
      userInput.push("student.email = " + "'" + req.query.email + "'");
    }
  }
  addStudentQueryParams(userInput);
 
  const addModuleQueryParams = function (moduleUserInput) {

    if (req.query.moduleCatalogNumber) {
      moduleUserInput.push("module.catalogNumber = " + "'" + req.query.moduleCatalogNumber + "'");
    }
    if (req.query.moduleDescription) {
      moduleUserInput.push("module.moduleDescription = " + "'" + req.query.moduleDescription + "'");
    }
    if (req.query.moduleLevel) {
      moduleUserInput.push("module.moduleLevel = " + "'" + req.query.moduleLevel + "'");
    }
    if (req.query.moduleAssessmentType) {
      moduleUserInput.push("module.assessmentTypeID = " + "'" + req.query.moduleAssessmentType + "'");
    }
    if (req.query.moduleSession) {
      moduleUserInput.push("module.sessionID = " + "'" + req.query.moduleSession + "'");
    }
    if (req.query.moduleUnits) {
      moduleUserInput.push("module.units = " + "'" + req.query.moduleUnits + "'");
    }
    if (req.query.moduleCore) {
      moduleUserInput.push("module.core = " + "'" + req.query.moduleCore + "'");
    }
    if (req.query.moduleTerm) {
      moduleUserInput.push("module.moduleTermID = " + "'" + req.query.moduleTerm + "'");
    }

    if (req.query.moduleSubject) {
      moduleUserInput.push("module.moduleDescription = " + "'" + req.query.moduleDescription + "'");
    }
  
  }
  addModuleQueryParams(moduleUserInput);

  const addProgramQueryParams = function (programUserInput) {
    if (req.query.programCode) {
      programUserInput.push("program.programCode = " + "'" + req.query.programCode + "'");
    }
    if (req.query.programDescription) {
      programUserInput.push("program.programDescription = " + "'" + req.query.programDescription + "'");
    }
    if (req.query.programAcademicLoad) {
      programUserInput.push("program.academicLoad = " + "'" + req.query.programAcademicLoad + "'");
    }
    if (req.query.programCareer) {
      programUserInput.push("program.careerID = " + "'" + req.query.programCareer + "'");
    }
    if (req.query.programAcademicOrg) {
      programUserInput.push("program.academicOrgID = " + "'" + req.query.programAcademicOrg + "'");
    }
    if (req.query.programAcademicPlan) {
      programUserInput.push("program.academicPlanID = " + "'" + req.query.programAcademicPlan + "'");
    }
    if (req.query.programStartTerm) {
      programUserInput.push("program.startTermID = " + "'" + req.query.programStartTerm + "'");
    }
    if (req.query.programCampus) {
      programUserInput.push("program.campusID = " + "'" + req.query.programCampus + "'");
    }
  }

addProgramQueryParams(programUserInput);
  try {
    const students = await studentQueryHandler.getStudentsQuery(userInput,moduleUserInput,programUserInput);
    res.send(students);
  } catch (err) {
    next(err)
  }
})



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