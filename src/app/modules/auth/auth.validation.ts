import { z } from "zod";

export const createUserZodSchema = z.object({
    body: z.object({
        password: z.string({
            required_error: "Password is required",
        }),
        name: z.string({
            required_error: "Name is required",
        }),
        email: z.string({
            required_error: "Email is required",
        }),
    }),
});
