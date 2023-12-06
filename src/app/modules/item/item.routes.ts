import express from "express";
import itemController from "./item.controller";
import validateRequest from './../../middleware/validateRequest';
import { createItemZodSchema } from "./item.validation";

const router = express.Router();

router.post("/create-item", validateRequest(createItemZodSchema), itemController.createItem);
router.get("/", itemController.getItems);
router.patch("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

export default router;