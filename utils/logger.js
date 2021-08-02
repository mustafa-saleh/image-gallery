require("winston-daily-rotate-file");
const { format, createLogger, transports } = require("winston");

/**
 * winston logger to log failed requests for analysis and debugging
 */
const logger = new createLogger({
  format: format.combine(format.timestamp(), format.prettyPrint()),
  transports: [
    new transports.DailyRotateFile({
      filename: "image_gallery-%DATE%.log",
      dirname: "logs/debug",
      timestamp: format.timestamp(),
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
  // 🌴 🏭 enable for production
  // exceptionHandlers: [
  //   new transports.DailyRotateFile({
  //     filename: "image_gallery-%DATE%.log",
  //     dirname: "logs/exceptions",
  //     timestamp: format.timestamp(),
  //     datePattern: "YYYY-MM-DD",
  //     maxSize: "20m",
  //     maxFiles: "14d",
  //   }),
  // ],
  exitOnError: false,
});

//📌 Stream to recieve logs from morgan and persist it to filesystem
logger.stream = {
  write: function (message, encoding) {
    logger.error(message);
  },
};

//📌 function to enable or add console logs
function consoleLogger() {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

module.exports = { logger, consoleLogger };
