const Router = require("express");

const authMiddleware = require("./utils/authMiddleware");

const router = Router();

const register = require("./controllers/register");
const login = require("./controllers/login");

router.get("/", async (req, res) => {
  const result = await sql`select version()`;

  res.status(200).json({ result });
});

router.post("/register", register);

router.post("/login", login);

module.exports = router;
