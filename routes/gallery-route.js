const router = require("express").Router();
const { authenticate } = require("../middlewares/authentication");
const { ResourceNotFound } = require("../controllers/not-found");
const upload = require("../utils/upload");

const {
  getAllGalleryImages,
  deleteGalleryImage,
  addGalleryImage,
} = require("../controllers/gallery-controller");

router.route("/").get(authenticate, getAllGalleryImages);
router.route("/").post(authenticate, upload.single("image"), addGalleryImage);
router.route("/:id").delete(authenticate, deleteGalleryImage);
router.all("*", ResourceNotFound);

module.exports = router;
