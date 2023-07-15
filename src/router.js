const Router = require("express");

const authMiddleware = require("./auth/authMiddleware");

const router = Router();

const home = require("./controllers/home");
const register = require("./controllers/users/register");
const login = require("./controllers/users/login");
const createTask = require("./controllers/tasks/createTask");
const readTask = require("./controllers/tasks/readTask");
const deleteTask = require("./controllers/tasks/deleteTask");
const updateTask = require("./controllers/tasks/updateTask");

router.post("/register", register);

router.post("/login", login);

router.post("/task/create", authMiddleware, createTask);

router.get("/task/read", authMiddleware, readTask);

router.delete("/task/delete", authMiddleware, deleteTask);

router.put("/task/update", authMiddleware, updateTask);

router.get("*", home);

module.exports = router;
