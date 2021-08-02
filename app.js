const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { logger, consoleLogger } = require("./utils/logger");
const { errorsHandler } = require("./middlewares/handlers");
const { BadRequest, NotFound } = require("./utils/http-errors");
const { userRoutes, authRoutes, homeRoutes } = require("./routes");

const app = express();
//📌 morgan, only log failed requests
const skip = (req, res) => res.statusCode < 400;

if (process.env.NODE_ENV !== "production") {
  consoleLogger();
}

//⚡ application middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("combined", { stream: logger.stream, skip }));

//🎯 application routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/", homeRoutes);

//💥 Errors handler
app.use(errorsHandler);

module.exports = app;
