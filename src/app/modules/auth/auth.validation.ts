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

export const loginUserZodSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is required",
        }),
        password: z.string({
            required_error: "Password is required",
        }),
    }),
})
