# Nanostr

NIP-05 ID service written by Deno.

## Features

- Data store on [Deta](https://deta.sh)
- Deploy on [Deno depoly](https://deno.com/deploy)

## Usage

Prepare your environments follow `env-example` file (DO NOT modify this file directly):

```
# optional, defaults 9000
PORT=
# required, like 20000000-ffff-ffff-ffff-000000000002
HCAPTCHA_SITE_KEY=
# required, like 0x0000000000000000000000000000000000000000
HCAPTCHA_SECRET=
# for deta, like deta://xxxxxxx_xxxxxxxxxxxxxxxxx
DB_URL=
# your nostr public key, npub1xxxxxxxxxxxxxxxxxxxxxxx
ROOT_PUBLIC_KEY=
# administration key, for next version
ADMIN_TOKEN=
```

Then start your service:

```
deno task start
```
