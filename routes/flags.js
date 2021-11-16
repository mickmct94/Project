const express = require('express')
const flagQueryHandler = require("../db/flagsQueeries");

var router = express.Router()

router.get("/flags", async function (req, res, next) {
    try {
        const flags = await flagQueryHandler.getFlags();
        res.send(flags);
    } catch (err) {
        next(err);
    }
})

router.get("/flags/:flagID", async function (req, res, next) {
    try {
        const flags = await flagQueryHandler.getFlagsByID(req.params.flagID);
        res.send(flags);
    } catch (err) {
        next(err);
    }
})

module.exports = router;