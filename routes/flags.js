const express = require('express')
const db = require("../db/db.Config&Queries");

var router = express.Router()

router.get("/flags", async function (req, res, next) {
    try {
        const flags = await db.getFlags();
        res.send(flags);
    } catch (err) {
        next(err);
    }
})

router.get("/flags/:flagID", async function (req, res, next) {
    try {
        const flags = await db.getFlagsByID(req.params.flagID);
        res.send(flags);
    } catch (err) {
        next(err);
    }
})

module.exports = router;