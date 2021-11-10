const express = require('express')
const db = require("../db/db.Config&Queries");


var router = express.Router();

router.get("/programs", async function (req, res, next) {
    try {
        const programs = await db.getPrograms();
        res.send(programs);
    } catch (err) {
        next(err);
    }
})

router.get("/programs/:programCode", async function (req, res, next) {
    try {
        const programs = await db.getProgramsByCode(req.params.programCode);
        res.send(programs);
    } catch (err) {
        next(err);
    }
})

module.exports = router;