import { Nip05Data, Repository } from "../types.ts";

export class DetaRepository implements Repository {
  secret: string;
  id: string;
  constructor(url: string) {
    const u = new URL(url);
    const [id] = u.hostname.split("_");
    this.id = id;
    this.secret = u.hostname;
  }

  async init() {}

  async _request<T>(
    method: string,
    base: string,
    target: string,
    body: unknown = null,
  ) {
    const uri = new URL(
      `${base}/${target}`,
      `https://database.deta.sh/v1/${this.id}/`,
    );
    const res = await fetch(uri.href, {
      method,
      body: body === null ? body : JSON.stringify(body),
      headers: { "content-type": "application/json", "x-api-key": this.secret },
    });

    if (res.status >= 400) {
      const err = await res.json() as { errors: string[] };
      throw new Error("errors" in err ? err.errors[0] : "Not found");
    }

    return await res.json() as T;
  }

  async create(name: string, pubkey: string) {
    await this._request("POST", "nip05keys", "items", {
      item: { key: name, pub: pubkey },
    });
  }

  async getByName(name: string) {
    return await this._request(
      "GET",
      "nip05keys",
      `items/${name}`,
    ) as Nip05Data;
  }
}
