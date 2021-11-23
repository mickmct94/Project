const { query } = require("express");
const dbPool = require("./config");

const queryParamChecker = function (req) {

  const addStudentQueryParams = function (req) {

    const studentQueryParams = [req.query.studentNumber, req.query.fName, req.query.lName, req.query.DOB, req.query.admitTerm, req.query.email, req.query.currentLevel, req.query.startLevel];

    const getStudentSQLStrings = [
      "student.studentNumber = " + "'" + req.query.studentNumber + "'",
      "student.firstName = " + "'" + req.query.fName + "'",
      "student.lastName = " + "'" + req.query.lName + "'",
      "student.DOB = " + "'" + req.query.DOB + "'",
      "student.admitTermID = " + "'" + req.query.admitTerm + "'",
      "student.email = " + "'" + req.query.email + "'",
      "student.currentLevel = " + "'" + req.query.currentLevel + "'",
      "student.startLevel = " + "'" + req.query.startLevel + "'"
    ]

    const studentParamsfiltered = getStudentSQLStrings.filter(function (element, index) {

      if (!studentQueryParams[index]) { return false } else return true;
    })

    return studentParamsfiltered;

  }

  const addModuleQueryParams = function (req) {

    const moduleQueryParams = [req.query.moduleCatalogNumber, req.query.moduleDescription, req.query.moduleLevel, req.query.moduleSession, req.query.moduleUnits, req.query.moduleAssessmentType, req.query.moduleSession, req.query.moduleCore, req.query.moduleTerm, req.query.moduleSubject, req.query.moduleProgramCode];

    const moduleSQLStrings = [
      "module.catalogNumber = " + "'" + req.query.moduleCatalogNumber + "'",
      "module.moduleDescription = " + "'" + req.query.moduleDescription + "'",
      "module.moduleLevel = " + "'" + req.query.moduleLevel + "'",
      "module.assessmentTypeID = " + "'" + req.query.moduleAssessmentType + "'",
      "module.sessionID = " + "'" + req.query.moduleSession + "'",
      "module.core = " + "'" + req.query.moduleCore + "'",
      "module.units = " + "'" + req.query.units + "'",
      "module.moduleTermID = " + "'" + req.query.moduleTerm + "'",
      "module.programCode = " + "'" + req.query.moduleProgramCode + "'",
      "module.moduleSubjectID = " + "'" + req.query.moduleSubject + "'"
    
    ]

    const moduleParamsfiltered = moduleSQLStrings.filter(function (element, index) {

      if (!moduleQueryParams[index]) { return false } else return true;
    })

    return moduleParamsfiltered;

  }

  const addProgramQueryParams = function (req) {

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

  const addFlagQueryParams = function (req) {

    const flagQueryParams = [req.query.flagID, req.query.flagDescription]

    const flagSQLStrings = [
      "flag.flagID = " + "'" + req.query.flagID + "'",
      "flag.flagDescription = " + "'" + req.query.flagDescription + "'",
    ]

    const flagParamsFiltered = flagSQLStrings.filter(function (element, index) {
      if (!flagQueryParams[index]) { return false } else return true;
    })

    return flagParamsFiltered;

  }

  const addMeetingQueryParams = function (req) {

    const meetingQueryParams = [req.query.meetingID, req.query.meetingDate, req.query.meetingOutcomeAdvice, req.query.meetingOutcomeProgressionIssue];

    const meetingSQLStrings = [
      "meeting.meetingID = " + "'" + req.query.meetingID + "'",
      "meeting.meetingDateTime = " + "'" + req.query.meetingDate + "'",
      "meetingoutcome.adviceGivenID = " + "'" + req.query.meetingOutcomeAdvice + "'",
      "meetingOutcome.progressionIssuesDiscussed = " + "'" + req.query.meetingOutcomeProgressionIssue + "'"
    ]

    const meetingParamsFiltered = meetingSQLStrings.filter(function (element, index) {
      if (!meetingQueryParams[index]) { return false } else return true;
    })

    return meetingParamsFiltered;

  }

  const studentQueryParams = addStudentQueryParams(req);
  const moduleQueryParams = addModuleQueryParams(req);
  const programQueryParams = addProgramQueryParams(req);



  return getQueryBuilder(studentQueryParams, moduleQueryParams, programQueryParams, req.path);

  }

const getByQueryParams = function (req, queryParamChecker) {

  const sqlQuery = queryParamChecker(req);

  return new Promise(function (resolve, reject) {

    dbPool.getConnection(function (err, connection) {

      if (err) reject(err);

      connection.query(sqlQuery, function (err, data) {

        connection.release();

        if (err) reject(err);
        else {
          const returnedData = data;
          resolve(returnedData);
        }
      })
    })

  })
}

const getQueryBuilder = function (studentQueryParams, moduleQueryParams, programQueryParams, reqPath) {

  if(reqPath === "/students/") {

  return "SELECT DISTINCT student.studentNumber, student.firstName, student.lastName, student.DOB, student.admitTermID, student.currentLevel, student.startLevel, module.programCode FROM student JOIN studentmodule ON student.studentNumber = studentmodule.studentNumber JOIN module ON studentmodule.catalogNumber = module.catalogNumber JOIN program ON module.programCode = program.programCode WHERE "
    + (studentQueryParams.length > 0 ? "" + studentQueryParams.join(' AND ') : "")
    + (moduleQueryParams.length > 0 ?  "" + moduleQueryParams.join(' AND ') : "")
    + (programQueryParams.length > 0 ? "" + programQueryParams.join(' AND ') : "")
 
  }

  if(reqPath === "/programs/") {
    return "SELECT DISTINCT program.programCode, program.programDescription, program.academicLoadID , program.careerID , program.academicOrgID , program.academicPlanID , program.startTermID , program.campusID FROM program JOIN studentprogram ON program.programCode = studentprogram.programCode JOIN module ON studentprogram.programCode = module.programCode JOIN studentmodule ON module.catalogNumber = studentmodule.catalogNumber JOIN student ON studentmodule.studentNumber = student.studentNumber WHERE "
    + (programQueryParams.length > 0 ? "" + programQueryParams.join(' AND ') : "")
    + (studentQueryParams.length > 0 ? "" + studentQueryParams.join(' AND ') : "")
    + (moduleQueryParams.length > 0 ?  "" + moduleQueryParams.join(' AND ') : "")

  } 

  
  if(reqPath === "/modules/") {
    x =  "SELECT DISTINCT module.catalogNumber, module.moduleDescription, module.moduleLevel, module.assessmentTypeID, module.sessionID, module.units, module.core, module.moduleTermID, module.programCode, module.subjectID FROM module JOIN studentmodule ON module.catalogNumber = studentmodule.catalogNumber JOIN studentprogram ON studentmodule.studentNumber = studentprogram.studentNumber JOIN student ON studentprogram.studentNumber = student.studentNumber WHERE "
    + (moduleQueryParams.length > 0 ?  "" + moduleQueryParams.join(' AND ') : "")
    + (programQueryParams.length > 0 ? "" + programQueryParams.join(' AND ') : "")
    + (studentQueryParams.length > 0 ? "" + studentQueryParams.join(' AND ') : "")
    console.log(x)
    return x
  }

}

const postQueryBuilder = function (req) {

if(req.method === "POST" && req.path === "/students/") {

  const studentQueryParams = [req.query.studentNumber, req.query.fName, req.query.lName, req.query.DOB, req.query.admitTerm, req.query.email, req.query.currentLevel, req.query.startLevel];

  return "INSERT INTO student (`studentNumber`,`firstName`,`lastName`,`DOB`,`admitTermID`,`email`,`currentLevel`,`startLevel`) VALUES ("
    + "'" + studentQueryParams.join("' ,'") + "')";
}

if(req.method === "POST" && req.path === "/modules/") {
 
  const moduleQueryParams = [req.query.moduleCatalogNumber, req.query.moduleDescription, req.query.moduleLevel, req.query.moduleUnits, req.query.moduleAssessmentType, req.query.moduleSession, req.query.moduleCore, req.query.moduleTerm, req.query.moduleSubject, req.query.moduleProgramCode];

  return "INSERT INTO `module` (`catalogNumber`, `moduleDescription`, `moduleLevel`, `units`, `assessmentTypeID`, `sessionID`, `core`, `moduleTermID`, `subjectID`, `programCode`) VALUES ("
  + "'" + moduleQueryParams.join("' ,'") + "')";

}

if(req.method === "POST" && req.path === "/programs/") {
 
  const programQueryParams = [req.query.programCode, req.query.programDescription, req.query.programAcademicLoad, req.query.programCareer, req.query.programAcademicOrg, req.query.programAcademicPlan, req.query.programStartTerm, req.query.programCampus];

  return "INSERT INTO `program` (`programCode`, `programDescription`, `academicLoadID`, `careerID`, `academicOrgID`, `academicPlanID`, `startTermID`, `campusID`) VALUES ("
    + "'" + programQueryParams.join("' ,'") + "')";
}
  
}

const postQueeries = function (req) {

  const sqlQuery = postQueryBuilder(req);

  return new Promise(function (resolve, reject) {

    dbPool.getConnection(function (err, connection) {

      if (err) reject(err);

      connection.query(sqlQuery, function (err, data) {

        connection.release();

        if (err) reject(err);
        else {
          const students = data;
          resolve(students);
        }
      })
    })

  })
}

const putStudentQueryBuilder = function (studentQueryParams) {


  const studentNumber = studentQueryParams.filter(function (element) {
    if (element.includes("student.studentNumber")) { return true } else return false;
  })

  const fieldsToUpdate = studentQueryParams.filter(function (element) {
    if (element.includes("student.studentNumber")) { return false } else return true;
  })

  return "UPDATE student SET " + fieldsToUpdate.join(", ") + " WHERE " + studentNumber;

}

const putStudents = function (studentQueryParams, putStudentQueryBuilder) {

  const sqlQuery = putStudentQueryBuilder(studentQueryParams);

  return new Promise(function (resolve, reject) {

    dbPool.getConnection(function (err, connection) {

      if (err) reject(err);

      connection.query(sqlQuery, function (err, data) {

        connection.release();

        if (err) reject(err);
        else {
          const students = data;
          resolve(students);
        }
      })
    })

  })
}


module.exports = {
  getByQueryParams,
  getQueryBuilder,
  queryParamChecker,
  postQueryBuilder,
  postQueeries,
  putStudents,
  putStudentQueryBuilder,
};

