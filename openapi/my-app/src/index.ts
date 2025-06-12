import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { ParamsSchema } from "./types/inputs";
import { UserSchema } from "./types/outputs";
import { swaggerUI } from "@hono/swagger-ui";
const app = new OpenAPIHono();

const getRoute = createRoute({
  method: "get",
  path: "/users/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Get user details",
    },
  },
});

app.openapi(getRoute, (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    id,
    age: 20,
    name: "Ultra-man",
  });
});

//Route on which we will get the OpenAPI docs.
//You will obtain your openapi spec file on visiting this route.
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

// Use the middleware to serve Swagger UI at /ui
app.get("/ui", swaggerUI({ url: "/doc" }));

export default app;
