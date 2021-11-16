const express = require('express')
const meetingQueryHandler = require("../db/meetingQueeries");

var router = express.Router();

router.get("/meetings/:meetingID", async function (req, res, next) {
    try {
        const meetings = await meetingQueryHandler.getMeeetingsByID(req.params.meetingID);
        res.send(meetings);
    } catch (err) {
        next(err);
     }
})


router.get("/meetings", async function (req, res, next) {
    try {
        const meetings = await meetingQueryHandler.getMeeetings();
        res.send(meetings);
    } catch (err) {
        next(err);
    }
})


module.exports = router;