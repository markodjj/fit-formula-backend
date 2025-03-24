const express = require("express");
const userRouter = express.Router();
const checkJwt = require("../auth");
const { createUser, getUserData } = require("../controllers/user.controller");

userRouter.post("/create-user", checkJwt, createUser);
userRouter.get("/profile", checkJwt, getUserData);

module.exports = userRouter;
