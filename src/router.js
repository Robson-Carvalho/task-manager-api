const Router = require("express");
const authMiddleware = require("./auth/authMiddleware");

const router = Router();

const home = require("./controllers/home");
const register = require("./controllers/users/register");
const login = require("./controllers/users/login");
const deleteAccount = require("./controllers/users/deleteAccount");
const createTask = require("./controllers/tasks/createTask");
const readTask = require("./controllers/tasks/readTask");
const deleteTask = require("./controllers/tasks/deleteTask");
const updateTask = require("./controllers/tasks/updateTask");
const notFound = require("./controllers/notFound");

router.get("/", home);

router.post("/user/register", register);

router.post("/user/login", login);

router.delete("/user/delete", authMiddleware, deleteAccount);

router.post("/task/create", authMiddleware, createTask);

router.get("/task/read", authMiddleware, readTask);

router.delete("/task/delete", authMiddleware, deleteTask);

router.put("/task/update", authMiddleware, updateTask);

router.get("*", notFound);

module.exports = router;
