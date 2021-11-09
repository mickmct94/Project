
const express = require("express");
const studentRoutes = require("./routes/students");
const moduleRoutes = require("./routes/modules");
const flagRoutes = require("./routes/flags");
const programRoutes = require("./routes/programs");
const meetingRoutes = require("./routes/meetings");

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

app.use("/api",studentRoutes)
app.use("/api",moduleRoutes)
app.use("/api",flagRoutes)
app.use("/api",programRoutes)
app.use("/api",meetingRoutes)

app.use(function (req, res, next) {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status

    }
  })
})

app.listen(3001, function () {
  console.log("Running on port 3001");
})