import { bech32, hex } from "./deps.ts";
import { HcaptchaResult } from "./types.ts";

export function toHexPublicKey(str: string) {
  if (str.startsWith("npub1")) {
    const res = bech32.decode(str);
    const words = new Uint8Array(bech32.fromWords(res.words));
    return new TextDecoder().decode(hex.encode(words));
  }

  return str.toLowerCase();
}

export async function validateHcaptcha(
  secret: string,
  response: string,
): Promise<void> {
  const res = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    body: new URLSearchParams({ response, secret }),
  });
  const json = await res.json() as HcaptchaResult;
  console.log(json);
  if (!json.success) throw new Error("Hcaptcha validate failure");
}
