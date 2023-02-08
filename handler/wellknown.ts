import { db } from "../database.ts";

export async function getName(req: Request) {
  const url = new URL(req.url);
  const name = url.searchParams.get("name");
  if (!name) throw new Error("Required name parameter");

  if (name === "_") {
    return new Response(
      JSON.stringify({ names: { _: Deno.env.get("ROOT_PUBLIC_KEY") } }),
      { headers: { "content-type": "application/nostr+json" } },
    );
  }
  const data = await db.getByName(name);

  try {
    return new Response(
      JSON.stringify({ names: { [data.key]: data.pub } }),
      { headers: { "content-type": "application/nostr+json" } },
    );
  } catch (err) {
    console.error(err);
    throw new Error(`Name '${name}' is not found`);
  }
}

export function getStatus(_: Request) {
  return new Response(
    JSON.stringify({
      software: "nanostr",
      version: "1.0.0",
      contact: Deno.env.get("ROOT_PUBLIC_KEY") || "",
      total: 0,
    }),
    { headers: { "content-type": "application/nostr+json" } },
  );
}
