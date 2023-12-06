"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const item_controller_1 = __importDefault(require("./item.controller"));
const validateRequest_1 = __importDefault(require("./../../middleware/validateRequest"));
const item_validation_1 = require("./item.validation");
const router = express_1.default.Router();
router.post("/create-item", (0, validateRequest_1.default)(item_validation_1.createItemZodSchema), item_controller_1.default.createItem);
router.get("/", item_controller_1.default.getItems);
router.patch("/:id", item_controller_1.default.updateItem);
router.delete("/:id", item_controller_1.default.deleteItem);
exports.default = router;
