"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = require("zod");
exports.createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
    }),
});
exports.loginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
