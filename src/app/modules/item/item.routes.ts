import express from "express";
import itemController from "./item.controller";
import validateRequest from './../../middleware/validateRequest';
import { createItemZodSchema } from "./item.validation";

const router = express.Router();

router.post("/create-item", validateRequest(createItemZodSchema), itemController.createItem);

export default router;