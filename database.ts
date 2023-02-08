import { DetaRepository } from "./adapter/deta.ts";
import { Repository } from "./types.ts";

function getDatabase(): Repository {
  const url = Deno.env.get("DB_URL");

  if (!url) throw new Error("Required DB_URL");

  if (url.startsWith("deta://")) {
    return new DetaRepository(url);
  }

  throw new Error("Unsupported data provider");
}

export const db = getDatabase();
