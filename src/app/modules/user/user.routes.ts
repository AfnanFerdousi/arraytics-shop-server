import express from "express";
import userController from "./user.controller";

const router = express.Router();

router.get("/", userController.getAllUsers);

export default router;