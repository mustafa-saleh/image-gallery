const { body, validationResult } = require("express-validator");
const { BadRequest } = require("../utils/http-errors");

/**
 * Validate login request params before fetching database
 * @middleware checkLoginParams
 * @param {Object} data - email and password
 * @failure {Object} response - constains validation errors
 */
async function checkLoginParams(req, res, next) {
  const chain = [
    body("email")
      .notEmpty()
      .withMessage("User email is required")
      .isEmail()
      .withMessage(`Invalid user email ${req.body.email}`),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("User password is required")
      .isLength({ min: 6 })
      .withMessage("User password minimum length is 6")
      .isLength({ max: 50 })
      .withMessage("User password maximum length exceeded"),
  ];

  await Promise.all(chain.map((validation) => validation.run(req)));
  try {
    validationResult(req).formatWith(errorsFormatter).throw();
    next();
  } catch (error) {
    //📌 mapped format errors as key value
    next(new BadRequest(error.mapped()));
  }
}

/**
 * Validate register request params before fetching database
 * @middleware checkRegisterParams
 * @param {Object} data - name, email and password
 * @failure {Object} response - constains validation errors
 */
async function checkRegisterParams(req, res, next) {
  const chain = [
    body("email")
      .notEmpty()
      .withMessage("User email is required")
      .isEmail()
      .withMessage(`Invalid user email ${req.body.email}`),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("User password is required")
      .isLength({ min: 6 })
      .withMessage("User password minimum length is 6")
      .isLength({ max: 50 })
      .withMessage("User password maximum length exceeded"),
  ];

  await Promise.all(chain.map((validation) => validation.run(req)));
  try {
    validationResult(req).formatWith(errorsFormatter).throw();
    next();
  } catch (error) {
    //📌 mapped format errors as key value
    next(new BadRequest(error.mapped()));
  }
}

/**
 * Function to format validation result in case of an error
 * @param {String} msg field validation error message
 */
function errorsFormatter({ msg }) {
  return msg;
}

module.exports = { checkLoginParams, checkRegisterParams };
