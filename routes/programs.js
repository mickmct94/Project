const express = require('express')
const programQueryHandler = ("../db/programQueries");


var router = express.Router();

router.get("/programs", async function (req, res, next) {
    try {
        const programs = await programQueryHandler.getPrograms();
        res.send(programs);
    } catch (err) {
        next(err);
    }
})

router.get("/programs/:programCode", async function (req, res, next) {
    try {
        const programs = await programQueryHandler.getProgramsByCode(req.params.programCode);
        res.send(programs);
    } catch (err) {
        next(err);
    }
})

module.exports = router;