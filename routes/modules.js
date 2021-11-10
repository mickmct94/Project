const express = require('express')
const db = require("../db/db.Config&Queries");

var router = express.Router();

//GET MODULES BY CATALOG NUMBER
router.get("/modules/:catalogNumber", async function (req, res, next) {
  try {
    const modules = await db.getModulesByCatlogNumber(req.params.catalogNumber);
    res.send(modules);
  } catch (err) {
    next(err);
  }
})

router.get("/modules", async function (req, res, next) {

  const userInput = [];

  if (req.query.catalogNumber) {
    userInput.push("catalogNumber = " + "'" + req.query.catalogNumber + "'");
  }
  if (req.query.moduleDescription) {
    userInput.push("moduleDescription = " + "'" + req.query.moduleDescription + "'");
  }
  if (req.query.moduleLevel) {
    userInput.push("moduleLevel = " + "'" + req.query.moduleLevel + "'");
  }
  if (req.query.assessmentType) {
    userInput.push("assessmentType = " + "'" + req.query.assessmentType + "'");
  }
  if (req.query.sessionID) {
    userInput.push("session = " + "'" + req.query.sessionID + "'");
  }
  if (req.query.units) {
    userInput.push("units = " + "'" + req.query.units + "'");
  }
  if (req.query.moduleTerm) {
    userInput.push("moduleTerm = " + "'" + req.query.moduleTerm + "'");
  }
  if (req.query.programCode) {
    userInput.push("programCode = " + "'" + req.query.programCode + "'");
  }
  console.log(userInput);

  try {
    const modules = await db.getModules(userInput.map(function (element) {
      return "module." + element;
    }));
    res.send(modules);
  } catch (err) {
    next(err);
  }
})
module.exports = router;