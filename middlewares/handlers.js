const { logger } = require("../utils/logger");
/**
 * Handle app erros and send response to user
 * @middleware errorsHandler
 * @param {Object} err - Instance of Error class
 * @returns {Object} response - constains staus and message
 */
function errorsHandler(err, req, res, next) {
  logger.error(
    `${err.statusCode}, ${JSON.stringify(err.errors || err.message)}`
  );
  return res.status(err.statusCode || 500).json({
    status: "error",
    errors: err.errors || err.message,
  });
}

/**
 * Handle api success response and send response to user
 * @middleware successHandler
 * @param {Object} data - Return data
 * @returns {Object} response - constains status and data
 */
function successHandler(res, result, { cookieData, options } = {}) {
  if (cookieData) {
    const { COOKIE_EXPIRES, NODE_ENV } = process.env;
    res.cookie("userToken", cookieData, {
      expires: new Date(Date.now() + COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: NODE_ENV === "production",
      ...options,
    });
  }
  return res.status(result.statusCode || 200).json({
    status: "success",
    data: result.data || {},
  });
}

module.exports = { errorsHandler, successHandler };
