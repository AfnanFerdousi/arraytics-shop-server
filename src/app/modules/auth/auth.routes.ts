import express from "express";
import validateRequest from "../../middleware/validateRequest";
import {
    createUserZodSchema,
} from "./auth.validation";
import authController from "./auth.controller";

const router = express.Router();

router.post(
    "/signup",
    validateRequest(createUserZodSchema),
    authController.createUser
);

export default router;
