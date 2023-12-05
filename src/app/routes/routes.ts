import express from "express";
import authRouter from "../modules/auth/auth.routes";

const router = express.Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: authRouter,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
