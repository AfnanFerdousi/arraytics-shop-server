"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.default)(auth_validation_1.createUserZodSchema), auth_controller_1.default.createUser);
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.loginUserZodSchema), auth_controller_1.default.loginUser);
router.get("/refresh", auth_controller_1.default.refreshToken);
exports.default = router;
