const router = require("express").Router();
const { authenticate } = require("../middlewares/authentication");
const { ResourceNotFound } = require("../controllers/not-found");
const { checkRegisterParams } = require("../middlewares/validators");
const { getUserbyId, addUser } = require("../controllers/user-controller");

router.route("/:id").get(authenticate, getUserbyId);
router.route("/register").post(checkRegisterParams, addUser);
router.all("*", ResourceNotFound);

module.exports = router;
