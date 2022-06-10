const http = require("http");
const https = require("https");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

process.on("uncaughtException", console.error);
process.on("uncaughtExceptionMonitor", console.error);
process.on("unhandledRejection", console.error);

const options = {};
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use((req, res, next) => {
    next();
});
app.use("/api/akuntansi/v1/", require("./api/akuntansi/v1/index"));
app.use((req, res, next) => {
    next({ code: 404 });
});
app.use((err, req, res, next) => {
    err = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
    console.error(err);
    err.code = (err?.originalError?.code && 400) || (http.STATUS_CODES[err.code] && err.code) || 500;
    res.status(err.code).json({
        // code: http.STATUS_CODES[err.code].replace(/[^\w]/g, "_").toUpperCase(),
        message: err.message,
    });
});

http.createServer(app).listen(80);
http.createServer(options, app).listen(443);
