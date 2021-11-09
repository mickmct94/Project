const express = require('express')
const db = require("../db");

var router = express.Router();

router.get("/modules", async function (req, res, next) {
    try {
        const modules = await db.getModules();
        res.send(modules);
    } catch (err) {
        next(err);
    }
})

router.get("/modules/:catalogNumber", async function (req, res, next) {
    try {
        const modules = await db.getModulesByCatlogNumber(req.params.catalogNumber);
        res.send(modules);
    } catch (err) {
        next(err);
    }
})

module.exports = router;