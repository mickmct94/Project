const express = require('express')
const queryBuilder = require('../queryBuilders/queryBuilder');
const paramChecker = require("../queryBuilders/paramChecker");

var router = express.Router()

router.get("/programs", async function (req, res, next) {

    try {
        const programs = await queryBuilder.getByQueryParams(req, paramChecker);
        res.send(programs);
    } catch (err) {
        next(err)
    }

})

router.post("/programs", async function (req, res, next) {

    try {
        await queryBuilder.postQueeries(req);
        res.send("OK")
    } catch (err) {
        next(err)
    }
})

router.put("/programs", async function (req, res, next) {

    try {
        await queryBuilder.putByQueryParams(req, paramChecker);
        res.send("OK");
    } catch (err) {
        next(err)
    }
})

module.exports = router;