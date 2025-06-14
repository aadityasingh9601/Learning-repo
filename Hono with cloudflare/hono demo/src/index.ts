import { Hono, Next } from "hono";

const app = new Hono();

//A simple middleware in Hono app.
async function authMiddleware(c: any, next: any) {
  if (c.req.header("Auth")) {
    await next();
  } else {
    return c.text("you don't have access.");
  }
}

app.get("/", authMiddleware, (c) => {
  return c.html(`<h2>This is our hono website </h2>
               <p>Today I am trying to build hono app and upload it on cloudflare workers.
    `);
});

app.post("/fruit", async (c) => {
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("first"));
  console.log(c.req.query("q"));
  return c.html("hello hono");
});

export default app;
