const User = require("../models/user-model");
const { BadRequest, NotFound } = require("../utils/http-errors");
const { successHandler } = require("../middlewares/handlers");
const { errorsReducer } = require("../utils/error-reducer");

/**
 * @api {get} /:id Request user by id
 * @apiName get user
 * @apiGroup User
 * @apiSuccess (200) {Object} data - User data
 * @apiVersion 0.1.0
 * @access protected
 */
async function getUserbyId(req, res, next) {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) return next(new BadRequest(`User ${id} not Found`));
    successHandler(res, { data: user.toUserJSON() });
  } catch (error) {
    const errors = errorsReducer(error.errors || `Failed to get User id ${id}`);
    next(new BadRequest(errors));
  }
}

/**
 * @api {post} / Add USer
 * @apiGroup USer
 * @apiParam {Objecct} name, email, password - user profile data
 * @apiSuccess (200) {Object} data Created User
 * @access public
 */
async function addUser(req, res, next) {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ where: { email } });
    if (user)
      return next(
        new BadRequest(`An account with email ${email} already exists`)
      );
    user = await User.create({ email, password });
    const data = { ...user.toUserJSON(), token: user.jwtToken() };
    successHandler(res, { statusCode: 201, data });
  } catch (error) {
    const errors = errorsReducer(error.errors || `Failed to add User ${email}`);
    next(new BadRequest(errors));
  }
}

module.exports = { getUserbyId, addUser };
