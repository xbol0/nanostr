/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "../deps.ts";
import { Header } from "./App.tsx";

export function AboutPage(p: { host: string; pub: string }) {
  return (
    <>
      <Header />
      <main>
        <p>
          This is a site you can alias your <a>Nostr</a>{" "}
          public key with a name, and paste it on your profile.
        </p>
        <p>
          The administrator only&nbsp;
          <code>_@{p.host}</code>, DO NOT trust others like&nbsp;
          <code>admin@{p.host}</code>.
        </p>

        <p>The administrator's public key is:</p>

        <pre><code>{p.pub}</code></pre>
      </main>
    </>
  );
}
