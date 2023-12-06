"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItemZodSchema = void 0;
const zod_1 = require("zod");
exports.createItemZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        created_by: zod_1.z.string({
            required_error: "created_by is required",
        }),
    }),
});
