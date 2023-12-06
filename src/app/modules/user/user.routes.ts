import express from "express";
import userController from "./user.controller";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.patch("/:email", userController.updateUser);

export default router;