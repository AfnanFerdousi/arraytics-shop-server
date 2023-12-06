import express from "express";
import authRouter from "../modules/auth/auth.routes";
import userRouter from "../modules/user/user.routes";
import itemRouter from "../modules/item/item.routes";

const router = express.Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: authRouter,
    },
    {
        path: "/user",
        route: userRouter,
    },
    {
        path: "/item",
        route: itemRouter,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
