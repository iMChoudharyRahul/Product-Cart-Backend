import express from "express";
import UserController from "../controllers/user.controller.js";

let router = express.Router();

let userController = new UserController();

//All api routes
router.post("/newUser", userController.registerNewUser);
router.post("/login", userController.loginUser);

export default router;
