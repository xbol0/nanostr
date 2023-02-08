import { toHexPublicKey, validateHcaptcha } from "../common.ts";
import { db } from "../database.ts";
import { jsonschema } from "../deps.ts";
import { CreateInput } from "../types.ts";
import { render } from "../web/render.tsx";

export async function postCreate(req: Request) {
  const params = new URLSearchParams(await req.text());
  const json = Object.fromEntries(params.entries()) as CreateInput;
  console.log(json);
  const v = jsonschema.validate(json, {
    type: "object",
    reqiured: ["name", "pubkey", "h-captcha-response"],
    properties: {
      name: { type: "string", pattern: "[a-zA-Z][a-z0-9A-Z_]{3,}" },
      pubkey: { type: "string" },
      "h-captcha-response": { type: "string" },
    },
  });

  try {
    if (!v) throw new Error("Invalid body");
    if (!isPubkey(json.pubkey)) throw new Error("Invalid public key");
    if (!json["h-captcha-response"]) {
      throw new Error("Please pass hCaptcha validation");
    }

    await validateHcaptcha(
      Deno.env.get("HCAPTCHA_SECRET")!,
      json["h-captcha-response"],
    );

    try {
      await db.create(json.name, toHexPublicKey(json.pubkey));
    } catch {
      throw new Error("Your name has been used");
    }

    const url = new URL(req.url);
    return render(req, {
      name: `${json.name}@${url.hostname}`,
      url: `${url.origin}/.well-known/nostr.json?name=${json.name}`,
    });
  } catch (err) {
    return render(req, { reason: err.message });
  }
}

function isPubkey(str: string) {
  if (/^[a-f0-9]{64}$/i.test(str)) return true;
  if (/^npub1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{58}$/i.test(str)) return true;
  return false;
}
