const express = require('express')
const db = require("../db");

var router = express.Router();

router.get("/meetings/:meetingID", async function (req, res, next) {
    try {
        const meetings = await db.getMeeetingsByID(req.params.meetingID);
        res.send(meetings);
    } catch (err) {
        next(err);
     }
})


router.get("/meetings", async function (req, res, next) {
    try {
        const meetings = await db.getMeeetings();
        res.send(meetings);
    } catch (err) {
        next(err);
    }
})


module.exports = router;