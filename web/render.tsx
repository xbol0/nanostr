import { renderToString } from "../deps.ts";
import { FailPage, HomePage, SuccessPage } from "./App.tsx";
import { React } from "../deps.ts";
import { AboutPage } from "./About.tsx";

export async function render(req: Request, params?: Record<string, unknown>) {
  const url = new URL(req.url);

  if (url.pathname === "/") {
    return renderHtml(await renderToString(<HomePage {...params} />));
  }

  if (url.pathname === "/create" && params) {
    return renderHtml(
      await renderToString(
        params.reason
          ? <FailPage {...params as { reason: string }} />
          : <SuccessPage {...params as { name: string; url: string }} />,
      ),
    );
  }

  if (url.pathname === "/about") {
    return renderHtml(
      await renderToString(
        <AboutPage
          host={url.hostname}
          pub={Deno.env.get("ROOT_PUBLIC_KEY") || ""}
        />,
      ),
    );
  }
  return new Response(null, { status: 404 });
}

function renderHtml(body: string) {
  return new Response(
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nanostr</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simpledotcss@2.1.1/simple.min.css" integrity="sha256-BVdlNoyCHVtxxbMKyxbkd77kzrVFeIQ4VUQJ+Nji2ss=" crossorigin="anonymous">
    <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
  </head>
  <body>
    ${body}
  </body>
</html>`,
    { headers: { "content-type": "text/html" } },
  );
}
