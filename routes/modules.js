const express = require('express')
const queryBuilder = require('../queryBuilders/queryBuilder');
const paramChecker = require("../queryBuilders/paramChecker");

var router = express.Router()

router.get("/modules", async function (req, res, next) {

    try {
        const modules = await queryBuilder.getByQueryParams(req, paramChecker);
        res.send(modules);
    } catch (err) {
        next(err)
    }

})

router.post("/modules", async function (req, res, next) {

    try {
        await queryBuilder.postQueeries(req);
        res.send("OK")
    } catch (err) {
        next(err)
    }
})

router.put("/modules", async function (req, res, next) {

    try {
        await queryBuilder.putByQueryParams(req, paramChecker);
        res.send("OK");
    } catch (err) {
        next(err)
    }
})





module.exports = router;