const { successHandler } = require("../middlewares/handlers");

/**
 * @api {GET} / Welcome Message
 * @apiGroup Home
 * @apiSuccess (200) {Object} data - welcome message and version
 * @access public
 */
function homePage(req, res, next) {
  const response = {
    data: {
      message: "image gallery with docker & CI/CD Pipelines",
      version: "1.0.0",
    },
  };
  successHandler(res, response);
}

module.exports = homePage;
