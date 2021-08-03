const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const { Unauthorized } = require("../utils/http-errors");

/**
 * Handle user authentication for incoming requests
 * @middleware authenticate
 * @failure {Object} Unauthorized - constains staus and message
 */
async function authenticate(req, res, next) {
  // const { userToken } = req.cookies;
  var header = req.headers.authorization || "";
  var token = header.split(/\s+/).pop() || "";
  if (!token) return next(new Unauthorized("Authentication required"));

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findOne({ where: { id } });
    next();
  } catch (error) {
    next(new Unauthorized("Authentication Failed"));
  }
}

module.exports = { authenticate };
