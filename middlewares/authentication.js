const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { Unauthorized } = require("../utils/http-errors");

/**
 * Handle user authentication for incoming requests
 * @middleware authenticate
 * @failure {Object} Unauthorized - constains staus and message
 */
function authenticate(req, res, next) {
  const { userToken } = req.cookies;
  if (!userToken) return next(new Unauthorized("Authentication required"));

  try {
    const { id } = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    req.user = User.findById(id);
    next();
  } catch (error) {
    next(new Unauthorized("Authentication Failed"));
  }
}

module.exports = { authenticate };
