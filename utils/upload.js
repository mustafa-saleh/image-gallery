const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

function fileFilter(req, file, cb) {
  const type = file.mimetype;
  const imageTypes = ["image/jpg", "image/jpeg", "image/png"];
  if (imageTypes.indexOf(type) === -1)
    cb(new Error(`Unsupported file type ${type}`));
  else cb(null, true);
}

const MB5 = 1024 * 1024 * 5;
const upload = multer({ storage, fileFilter, limits: { fileSize: MB5 } });

module.exports = upload;
