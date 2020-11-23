const homeRoutes = require("express").Router();
const roleRoutes = require("./role-route");
const userRoutes = require("./user-route");
const authRoutes = require("./auth-route");
const homePage = require("../controllers");
const { ResourceNotFound } = require("../controllers/not-found");

homeRoutes.get("/", homePage);

homeRoutes.all("*", ResourceNotFound);

module.exports = { roleRoutes, userRoutes, authRoutes, homeRoutes };
