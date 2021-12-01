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
  
  return params;
  
  }

  module.exports = queryParamChecker;