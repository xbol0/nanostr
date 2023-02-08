# Nanostr

NIP-05 ID service written by Deno.

## Features

- Data store on [Deta](https://deta.sh)
- Deploy on [Deno depoly](https://deno.com/deploy)

## Usage

Prepare your environments follow `env-example` file (DO NOT modify this file directly):

```
PORT=
HCAPTCHA_SITE_KEY=
HCAPTCHA_SECRET=
DB_URL=
ROOT_PUBLIC_KEY=
ADMIN_TOKEN=
```

Then start your service:

```
deno task start
```
