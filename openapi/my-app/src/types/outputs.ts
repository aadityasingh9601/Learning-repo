import { z } from "@hono/zod-openapi";

export const UserSchema = z
  .object({
    id: z.string().openapi({
      example: "123",
    }),
    name: z.string().openapi({
      example: "John Doe",
    }),
    age: z.number().openapi({
      example: 44,
    }),
  })
  .openapi("User");
