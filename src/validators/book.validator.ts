import { z } from "zod";

//  create book body parameters validation schema
export const createBookSchema = z.object({
  title: z.string({ error: "Title is required" }),
  author: z.string({ error: "Author is required" }),
  publishedYear: z
    .number()
    .int()
    .gte(1000, { message: "Year must be valid" })
    .lte(new Date().getFullYear(), { message: "Year cannot be in the future" })
    .optional(),
  genre: z.string().optional(),
  stock: z
    .number({ error: "Stock is required and must be a number"})
    .int()
    .positive({ message: "Stock must be positive" }),
});

//  get books query parameters validation schema
export const getBooksQuerySchema = z.object({
  genre: z.string().optional(),
  author: z.string().optional(),
  minYear: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "minYear must be a number" })
    .refine((val) => val >= 1000 && val <= new Date().getFullYear(), {
      message: "minYear must be a valid year",
    })
    .optional(),
    available: z
    .string()
    .refine((val) => val === "true" || val === "false", {
      message: "available must be true or false",
    })
    .transform((val) => val === "true")
    .optional(),
    limit: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "limit must be positive" })
    .optional()
    .default(10),
    offset: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val >= 0, { message: "offset must be >= 0" })
    .optional()
    .default(0),
  });
  

  export type GetBooksQueryDto = z.infer<typeof getBooksQuerySchema>;
  export type CreateBookDTO = z.infer<typeof createBookSchema>;