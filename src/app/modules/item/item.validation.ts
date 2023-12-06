import { z } from "zod";

export const createItemZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
        }),
        created_by: z.string({
            required_error: "created_by is required",
        }),
    }),
})