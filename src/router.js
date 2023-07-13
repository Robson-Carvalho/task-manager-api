const Router = require("express");

const authMiddleware = require("./utils/authMiddleware");

const router = Router();

const home = require("./controllers/home");
const register = require("./controllers/register");
const login = require("./controllers/login");

router.post("/register", register);

router.post("/login", login);

router.get("*", home);

module.exports = router;
