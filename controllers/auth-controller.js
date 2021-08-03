const User = require("../models/user-model");
const { BadRequest } = require("../utils/http-errors");
const { successHandler } = require("../middlewares/handlers");
const { errorsReducer } = require("../utils/error-reducer");

/**
 * @api {post} /login log user in
 * @apiGroup Auth
 * @apiSuccess (200) {Object} data - User data includes token
 * @access public
 */
async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    //1️⃣ check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) return next(new BadRequest("Incorrect User email or password"));

    //2️⃣ check if password is correct
    const validPassword = await user.verifyPassword(password);
    if (!validPassword)
      return next(new BadRequest("Incorrect User email or password"));

    //🔓 generate token and send it in cookie
    const cookie = { cookieData: user.jwtToken() };
    successHandler(res, { data: user.toUserJSON() }, cookie);
  } catch (error) {
    //⛔ login failed
    const errors = errorsReducer(
      error.errors || `Failed to Login User ${email}`
    );
    next(new BadRequest(errors));
  }
}

/**
 * @api {post} / log USer out
 * @apiGroup Auth
 * @apiParam {Objecct} id, token - user auth data
 * @apiSuccess (200) {Object} data - status
 * @access protected
 */
async function logout(req, res, next) {
  //📌 clear cookie by setting it to expire now
  const cookie = {
    cookieData: "clear",
    options: { expires: new Date() },
  };
  successHandler(res, {}, cookie);
}

module.exports = { login, logout };
