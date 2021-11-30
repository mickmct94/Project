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

  const addStudentModuleParams = function (req) {



    const studentModuleQueryParams = [req.query.moduleMark, req.query.moduleResult, req.query.moduleResitMark, req.query.moduleResitResult, req.query.moduleMarkGt, req.query.moduleMarkLt];

    const studentModuleSQLStrings = [
      "studentModule.mark = " + "'" + req.query.moduleMark + "'",
      "studentModule.markResult = " + "'" + req.query.moduleResult + "'",
      "studentModule.resitMark = " + "'" + req.query.moduleResitMark + "'",
      "studentModule.resitResult = " + "'" + req.query.moduleResitResult + "'",
      "studentModule.mark >= " + "'" + req.query.moduleMarkGt + "'",
      "studentModule.mark <= " + "'" + req.query.moduleMarkLt + "'"
    ]

    const studentModuleParamsFiltered = studentModuleSQLStrings.filter(function (element, index) {
      if (!studentModuleQueryParams[index]) { return false } else return true;
    })

    return studentModuleParamsFiltered;

  }

  const params = {
    studentQueryParams: addStudentQueryParams(req),
    moduleQueryParams: addModuleQueryParams(req),
    programQueryParams: addProgramQueryParams(req),
    studentModuleQueryParams: addStudentModuleParams(req),
    flagQueryParams: addFlagQueryParams(req)
  }

  if (req.method === "PUT") {
    return params;
  }

  return getQueryBuilder(params, req.path);

}

const getByQueryParams = function (req) {

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

const getQueryBuilder = function (params, path) {

  if (path === "/students") {

    return "SELECT DISTINCT student.studentNumber, student.firstName, student.lastName, student.DOB, student.admitTermID, student.currentLevel, student.startLevel, module.programCode FROM student JOIN studentmodule ON student.studentNumber = studentmodule.studentNumber JOIN module ON studentmodule.catalogNumber = module.catalogNumber JOIN program ON module.programCode = program.programCode WHERE "
      + (params.studentQueryParams.length > 0 ? "" + params.studentQueryParams.join(' AND ') : "")
      + (params.moduleQueryParams.length > 0 ? "" + params.moduleQueryParams.join(' AND ') : "")
      + (params.programQueryParams.length > 0 ? "" + params.programQueryParams.join(' AND ') : "")

  }

  if (path === "/programs") {
    return "SELECT DISTINCT program.programCode, program.programDescription, program.academicLoadID , program.careerID , program.academicOrgID , program.academicPlanID , program.startTermID , program.campusID FROM program JOIN studentprogram ON program.programCode = studentprogram.programCode JOIN module ON studentprogram.programCode = module.programCode JOIN studentmodule ON module.catalogNumber = studentmodule.catalogNumber JOIN student ON studentmodule.studentNumber = student.studentNumber WHERE "
      + (params.programQueryParams.length > 0 ? "" + params.programQueryParams.join(' AND ') : "")
      + (params.studentQueryParams.length > 0 ? "" + params.studentQueryParams.join(' AND ') : "")
      + (params.moduleQueryParams.length > 0 ? "" + params.moduleQueryParams.join(' AND ') : "")

  }


  if (path === "/modules") {
    return "SELECT DISTINCT module.catalogNumber, module.moduleDescription, module.moduleLevel, module.assessmentTypeID, module.sessionID, module.units, module.core, module.moduleTermID, module.programCode, module.subjectID FROM module JOIN studentmodule ON module.catalogNumber = studentmodule.catalogNumber JOIN studentprogram ON studentmodule.studentNumber = studentprogram.studentNumber JOIN student ON studentprogram.studentNumber = student.studentNumber WHERE "
      + (params.moduleQueryParams.length > 0 ? "" + params.moduleQueryParams.join(' AND ') : "")
      + (params.programQueryParams.length > 0 ? "" + params.programQueryParams.join(' AND ') : "")
      + (params.studentQueryParams.length > 0 ? "" + params.studentQueryParams.join(' AND ') : "")

  }

  if (path === "/students/modules") {

    return "SELECT DISTINCT studentmodule.studentNumber, student.firstName, student.lastName, studentmodule.catalogNumber, module.moduleDescription, module.units, studentmodule.mark, studentmodule.markResult, studentmodule.resitMark, studentmodule.resitResult, program.programCode FROM student JOIN studentModule ON student.studentNumber = studentModule.studentNumber JOIN module ON studentmodule.catalogNumber = module.catalogNumber JOIN program ON module.programCode = program.programCode WHERE "
      + (params.studentQueryParams.length > 0 ? "" + params.studentQueryParams.join(' AND ') : "")
      + (params.studentModuleQueryParams.length > 0 ? "" + params.studentModuleQueryParams.join(' AND ') : "")

  }

  if (path === "/students/flags") {
    return "SELECT DISTINCT studentFlag.studentNumber, student.firstName, student.lastName, flag.flagDescription FROM student JOIN studentFlag ON student.studentNumber = studentFlag.studentNumber JOIN flag ON studentFlag.flagID = flag.flagID  WHERE "
      + (params.studentQueryParams.length > 0 ? "" + params.studentQueryParams.join(' AND ') : "")

  }



}

const postQueryBuilder = function (req) {

  const path = req.path;
  const method = req.method;

  if (method === "POST" && path === "/students") {

    const studentQueryParams = [req.query.studentNumber, req.query.fName, req.query.lName, req.query.DOB, req.query.admitTerm, req.query.email, req.query.currentLevel, req.query.startLevel];

    return "INSERT INTO student (studentNumber, firstName, lastName, DOB, admitTermID , email,currentLevel, startLevel) VALUES ("
      + "'" + studentQueryParams.join("' ,'") + "')";
  }

  if (method === "POST" && path === "/modules") {

    const moduleQueryParams = [req.query.moduleCatalogNumber, req.query.moduleDescription, req.query.moduleLevel, req.query.moduleUnits, req.query.moduleAssessmentType, req.query.moduleSession, req.query.moduleCore, req.query.moduleTerm, req.query.moduleSubject, req.query.moduleProgramCode];

    return "INSERT INTO module (catalogNumber, moduleDescription, moduleLevel, units, assessmentTypeID, sessionID, core, moduleTermID, subjectID, programCode) VALUES ("
      + "'" + moduleQueryParams.join("' ,'") + "')";

  }

  if (method === "POST" && path === "/programs") {

    const programQueryParams = [req.query.programCode, req.query.programDescription, req.query.programAcademicLoad, req.query.programCareer, req.query.programAcademicOrg, req.query.programAcademicPlan, req.query.programStartTerm, req.query.programCampus];

    return "INSERT INTO program (programCode, programDescription, academicLoadID, careerID, academicOrgID, academicPlanID, startTermID, campusID) VALUES ("
      + "'" + programQueryParams.join("' ,'") + "')";
  }

  if (method === "POST" && path === "/students/modules") {

    studentModuleQueryParams = [req.query.studentNumber, req.query.moduleCatalogNumber, req.query.moduleMark, req.query.moduleMarkResult, req.query.moduleResitMark, req.query.moduleResitResult]

    return "INSERT INTO studentmodule (studentModule.studentNumber, studentModule.catalogNumber, studentModule.mark, studentModule.markResult, studentModule.resitMark, studentModule.resitResult) VALUES ("
      + "'" + studentModuleQueryParams.join("' ,'") + "')";

  }

  if (method === "POST" && path === "/students/programs") {

    const studentProgramQueryParams = [req.query.studentNumber, req.query.programCode]

    return "INSERT INTO studentprogram (studentProgram.studentNumber, studentProgram.programCode) VALUES ("
      + "'" + studentProgramQueryParams.join("' ,'") + "')";

  }

  if (method === "POST" && path === "/students/flags") {

    const studentFlagsQueryParams = [req.query.studentNumber, req.query.flagID]
    console.log(studentFlagsQueryParams)
    var q = "INSERT INTO studentflag (studentFlag.studentNumber, studentFlag.FlagID) VALUES ("
      + "'" + studentFlagsQueryParams.join("' ,'") + "')";
    console.log(q)
    return q;
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

const putQueryBuilder = function (params, path) {

  if (path === "/students") {

    const studentNumber = params.studentQueryParams.filter(function (element) {

      if (element.includes("student.studentNumber")) { return true } else return false;
    })

    const fieldsToUpdate = params.studentQueryParams.filter(function (element) {
      if (element.includes("student.studentNumber")) { return false } else return true;
    })

    return "UPDATE student SET " + fieldsToUpdate.join(", ") + " WHERE " + studentNumber;
  }


  if (path === "/modules") {

    const catalogNumber = params.moduleQueryParams.filter(function (element) {
      if (element.includes("module.catalogNumber")) { return true } else return false;
    })

    const fieldsToUpdate = params.moduleQueryParams.filter(function (element) {
      if (element.includes("module.catalogNumber")) { return false } else return true;
    })

    return "UPDATE module SET " + fieldsToUpdate.join(", ") + " WHERE " + catalogNumber;

  }

  if (path === "/programs") {

    const programCode = params.programQueryParams.filter(function (element) {
      if (element.includes("program.programCode")) { return true } else return false;
    })

    const fieldsToUpdate = params.programQueryParams.filter(function (element) {
      if (element.includes("program.programCode")) { return false } else return true;
    })

    return "UPDATE program SET " + fieldsToUpdate.join(", ") + " WHERE " + programCode;

  }

  if (path === "/students/modules") {

    let studentNumber = params.studentQueryParams.filter(function (element) {
      if (element.includes("student.studentNumber")) { return true } else return false;
    }).toString();

    const trimmedStudentNumber = studentNumber.slice(studentNumber.lastIndexOf("s"));

    const fieldsToUpdate = params.studentModuleQueryParams;

    return "UPDATE studentModule SET " + fieldsToUpdate.join(", ") + " WHERE " + trimmedStudentNumber;

  }


  if (path === "/students/programs") {

    let studentNumber = params.studentQueryParams.filter(function (element) {
      if (element.includes("student.studentNumber")) { return true } else return false;
    }).toString();

    const fieldsToUpdate = params.programQueryParams.filter(function (element) {
      if (element.includes("program.programCode")) { return true } else return false;
    });

    fieldsToUpdate.push(studentNumber)

    const trimmedFieldsToUpdate = fieldsToUpdate.map(function (element) {
      if (element.includes("student.studentNumber")) {
        return element.slice(element.lastIndexOf("s"));
      } else {
        return element.slice(element.lastIndexOf("p"));
      }
    });

    return "UPDATE studentProgram SET " + trimmedFieldsToUpdate.join(", ") + " WHERE " + trimmedFieldsToUpdate[trimmedFieldsToUpdate.length - 1];

  }

  if (path === "/students/flags") {

    const studentNumber = params.studentQueryParams.filter(function (element) {
      if (element.includes("student.studentNumber")) { return true } else return false;
    }).toString();

    const fieldsToUpdate = params.flagQueryParams.filter(function (element) {
      if (element.includes("flag.flagID")) { return true } else return false;
    });

    fieldsToUpdate.push(studentNumber)

    const trimmedFieldsToUpdate = fieldsToUpdate.map(function (element) {
      if (element.includes("student.studentNumber")) {
        return element.slice(element.lastIndexOf("s"));
      } else {
        return element.slice(element.lastIndexOf("f"))
      }
    });

    console.log(trimmedFieldsToUpdate[trimmedFieldsToUpdate.length - 1])

    return "UPDATE studentFlag SET " + trimmedFieldsToUpdate.join(", ") + " WHERE " + trimmedFieldsToUpdate[trimmedFieldsToUpdate.length - 1];
  }
}

const putByQueryParams = function (req) {

  const params = queryParamChecker(req);

  const sqlQuery = putQueryBuilder(params, req.path);

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
  putByQueryParams,
  putQueryBuilder,
};

