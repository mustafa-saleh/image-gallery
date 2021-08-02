/**
 * This file is part of image gallery project
 * (c) 2020
 *
 * --------------------------------------------
 *
 * @module utils/apiErrors
 * @author Mustafa Saleh <mustafasaleh.hf@gmail.com>
 */

/**
 * Base class for errors thrown in app
 * @class
 */
class ErrorBase extends Error {
  /**
   * Set the error message
   * @param {string} message - error message to return in response
   */
  constructor(message) {
    super();
    this.errors = typeof message === "string" ? { message } : message;
  }

  /**
   * @property {number} statusCode - caculated property for status code
   */
  get statusCode() {
    return this.getErrorCode();
  }

  /**
   * get error status code
   * @function getErrorCode
   * @alias getErrorStatusCode
   * @returns {number} error status code
   */
  getErrorCode() {
    if (this instanceof BadRequest) return 400;
    else if (this instanceof Unauthorized) return 401;
    else if (this instanceof NotFound) return 404;
    else if (this instanceof InternalServerError) return 500;
    else return null;
  }
}

/**
 * Http Status code 400 Bad Request
 * @class
 */
class BadRequest extends ErrorBase {}

/**
 * Http Status code 404 Not Found
 * @class
 */
class NotFound extends ErrorBase {}

/**
 * Http Status code 401 Unauthorized
 * @class
 */
class Unauthorized extends ErrorBase {}

/**
 * Http Status code 500 Internal Server Error
 * @class
 */
class InternalServerError extends ErrorBase {}

module.exports = {
  ErrorBase,
  BadRequest,
  NotFound,
  Unauthorized,
  InternalServerError,
};
