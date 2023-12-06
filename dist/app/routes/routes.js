"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const item_routes_1 = __importDefault(require("../modules/item/item.routes"));
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.default,
    },
    {
        path: "/user",
        route: user_routes_1.default,
    },
    {
        path: "/item",
        route: item_routes_1.default,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
