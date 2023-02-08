import { render } from "./web/render.tsx";
import { http } from "./deps.ts";
import { postCreate } from "./handler/nip05.ts";
import { getName, getStatus } from "./handler/wellknown.ts";

const Router = new Map<string, Deno.ServeHandler>([
  ["GET /.well-known/nostr.json", getName],
  ["GET /status", getStatus],
  ["POST /create", postCreate],
]);

export function start() {
  const port = parseInt(Deno.env.get("PORT") || "9000");

  http.serve(async (req) => {
    const url = new URL(req.url);
    const route = `${req.method} ${url.pathname}`;
    console.log(route);

    const fn = Router.get(route);
    if (!fn) return render(req);

    try {
      return await fn(req);
    } catch (err) {
      return new Response(err.message, { status: 400 });
    }
  }, { port });
}
