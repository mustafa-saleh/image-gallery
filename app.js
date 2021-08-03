const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { logger, consoleLogger } = require("./utils/logger");
const { errorsHandler } = require("./middlewares/handlers");
const { BadRequest, NotFound } = require("./utils/http-errors");
const {
  userRoutes,
  authRoutes,
  galleryRoutes,
  homeRoutes,
} = require("./routes");

const app = express();
//📌 morgan, only log failed requests
const skip = (req, res) => res.statusCode < 400;

if (process.env.NODE_ENV !== "production") {
  consoleLogger();
}

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//⚡ application middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));
app.use(morgan("combined", { stream: logger.stream, skip }));

//🎯 application routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/gallery", galleryRoutes);
app.use("/", homeRoutes);

//💥 Errors handler
app.use(errorsHandler);

module.exports = app;
