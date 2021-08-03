const { BadRequest, NotFound, Unauthorized } = require("../utils/http-errors");
const { successHandler } = require("../middlewares/handlers");
const { errorsReducer } = require("../utils/error-reducer");
const Image = require("../models/image-model");

/**
 * @api {post} / Get GalleryI mages
 * @apiGroup Gallery
 * @apiParam {Objecct}
 * @apiSuccess (200) {Object} data Created User
 * @access public
 */
async function getAllGalleryImages(req, res, next) {
  const { id } = req.user;
  try {
    const images = await Image.findAll({ where: { userId: id } });
    successHandler(res, { data: images });
  } catch (error) {
    const errors = errorsReducer(
      error.errors || `Failed to get images for User id ${id}`
    );
    next(new BadRequest(errors));
  }
}

/**
 * @api {post} / Add GalleryI mage
 * @apiGroup Gallery
 * @apiParam {Objecct} path, user
 * @apiSuccess (200) {Object} data Created User
 * @access public
 */
async function addGalleryImage(req, res, next) {
  const { user } = req;
  const { destination, filename, originalname } = req.file;
  const path = destination + filename;

  try {
    const image = await Image.create({ path, userId: user.id });
    successHandler(res, { statusCode: 201, data: image });
  } catch (error) {
    const errors = errorsReducer(
      error.errors || `Failed to add image ${originalname}`
    );
    next(new BadRequest(errors));
  }
}

/**
 * @api {post} / delete GalleryI mage
 * @apiGroup Gallery
 * @apiParam {Objecct} path, user
 * @apiSuccess (200) {Object} data Created User
 * @access public
 */
async function deleteGalleryImage(req, res, next) {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const image = await Image.findOne({ where: { id } });
    if (!image) return next(new BadRequest(`Image ${id} not Found`));
    if (image.userId !== userId)
      return next(new Unauthorized(`Unauthorized to delete the Image ${id}`));
    const numOfRowsAffected = await Image.destroy({ where: { id } });
    successHandler(res, { statusCode: 200, data: numOfRowsAffected });
  } catch (error) {
    const errors = errorsReducer(
      error.errors || `Failed to delete image ${id}`
    );
    next(new BadRequest(errors));
  }
}

async function getGalleryImage(req, res, next) {}

module.exports = {
  getGalleryImage,
  getAllGalleryImages,
  deleteGalleryImage,
  addGalleryImage,
};
