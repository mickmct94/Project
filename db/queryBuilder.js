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

if(req.path === "/students/")  {

  if (req.method === "PUT") { putStudents(studentQueryParams, putStudentQueryBuilder) } else {

    return getStudentsQueryBuilder(studentQueryParams, moduleQueryParams, programQueryParams);

  }
}
}

const getStudentsByQueryParams = function (req, queryParamChecker) {

  const sqlQuery = queryParamChecker(req);

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

const getStudentsQueryBuilder = function (studentQueryParams, moduleQueryParams, programQueryParams) {

  //Search by student,module and program - studentflag and meeting records not yet added.
  return "SELECT DISTINCT student.studentNumber, student.firstName, student.lastName, student.DOB, student.admitTermID, student.currentLevel, student.startLevel, module.programCode FROM student JOIN studentmodule ON student.studentNumber = studentmodule.studentNumber JOIN module ON studentmodule.catalogNumber = module.catalogNumber JOIN program ON module.programCode = program.programCode WHERE " + studentQueryParams.join(' AND ')
    + (moduleQueryParams.length > 0 ? "" + " AND " + moduleQueryParams.join(' AND ') : "")
    + (programQueryParams.length > 0 ? "" + " AND " + programQueryParams.join(' AND ') : "")

}

const postStudentsQueryParamChecker = function (req) {

  const studentQueryParams = [req.query.studentNumber, req.query.fName, req.query.lName, req.query.DOB, req.query.admitTerm, req.query.email, req.query.currentLevel, req.query.startLevel];

  const sqlQuery = postStudentQueryBuilder(studentQueryParams);

  return sqlQuery;
}

const postStudentQueryBuilder = function (studentQueryParams) {


  const sqlQuery = "INSERT INTO student (`studentNumber`,`firstName`,`lastName`,`DOB`,`admitTermID`,`email`,`currentLevel`,`startLevel`) VALUES ("
    + "'" + studentQueryParams.join("' ,'") + "')";

  return sqlQuery;
}

const postStudents = function (req, postStudentsQueryParamChecker) {

  const sqlQuery = postStudentsQueryParamChecker(req);

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

const putStudentQueryBuilder = function (req) {


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
  getStudentsByQueryParams,
  getStudentsQueryBuilder,
  queryParamChecker,
  postStudentsQueryParamChecker,
  postStudentQueryBuilder,
  postStudents,
  putStudents,
  putStudentQueryBuilder
};

