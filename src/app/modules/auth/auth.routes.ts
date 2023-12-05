import express from "express";
import validateRequest from "../../middleware/validateRequest";
import {
    createUserZodSchema, loginUserZodSchema,
} from "./auth.validation";
import authController from "./auth.controller";

const router = express.Router();

router.post(
    "/signup",
    validateRequest(createUserZodSchema),
    authController.createUser
);
router.post("/login", validateRequest(loginUserZodSchema), authController.loginUser);
router.get("/refresh", authController.refreshToken);

export default router;
