/// <reference types="https://esm.sh/@hcaptcha/types@1.0.3" />
/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "../deps.ts";

export function HomePage() {
  return (
    <>
      <Header />
      <Home />
    </>
  );
}

function Home() {
  return (
    <main>
      <p>
        You can assign a name for your Nostr public key, this service
        follow&nbsp;
        <a
          href="https://github.com/nostr-protocol/nips/blob/master/05.md"
          target="_blank"
        >
          NIP-05
        </a>.
      </p>

      <form method="POST" action="/create">
        <p>
          <label>Name:</label>
          <input type="text" name="name" placeholder="eg. alice" />
        </p>
        <p>
          <label>Your Nostr public key:</label>
          <input
            type="text"
            name="pubkey"
            placeholder="Support hex encoding or npub format"
          />
        </p>
        <HCaptcha />

        <p>
          <input type="submit" value="Submit" />
        </p>
      </form>
    </main>
  );
}

export function SuccessPage(props: { name: string; url: string }) {
  return (
    <>
      <Header />
      <main>
        <p>
          Success! You can use your NIP-05 name:&nbsp;
          <a href={props.url} target="_blank">{props.name}</a>.
        </p>
      </main>
    </>
  );
}

export function FailPage(props: { reason: string }) {
  return (
    <>
      <Header />
      <main>
        <p>
          Fail! {props.reason}&nbsp;
          <a href="/">&lt;&lt; Back</a>.
        </p>
      </main>
    </>
  );
}

export function Header() {
  return (
    <header>
      <h1>Nanostr</h1>
      <p>NIP-05 name alias</p>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="https://github.com/" target="_blank">Github</a>
      </nav>
    </header>
  );
}

function HCaptcha() {
  const secret = Deno.env.get("HCAPTCHA_SITE_KEY");
  // @ts-ignore fix jsx
  return secret ? <div class="h-captcha" data-sitekey={secret}></div> : null;
}
