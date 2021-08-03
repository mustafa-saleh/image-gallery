const homeRoutes = require("express").Router();
const userRoutes = require("./user-route");
const authRoutes = require("./auth-route");
const galleryRoutes = require("./gallery-route");
const homePage = require("../controllers");
const { ResourceNotFound } = require("../controllers/not-found");

homeRoutes.get("/", homePage);

homeRoutes.all("*", ResourceNotFound);

module.exports = { userRoutes, authRoutes, galleryRoutes, homeRoutes };
