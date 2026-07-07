"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

const SDKS = [
  { lang: "TypeScript", cmd: "npm install wallet-primitive" },
  { lang: "Python", cmd: "pip install wallet-primitive" },
  { lang: "Go", cmd: "go get github.com/wallet-primitive/go" },
  { lang: "PHP", cmd: "composer require wallet-primitive/php" },
  { lang: "Java", cmd: "implementation 'dev.walletprimitive:sdk:1.0.0'" },
  { lang: "C#", cmd: "dotnet add package WalletPrimitive" },
];

function SdkCard({ lang, cmd }: { lang: string; cmd: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-xl border border-white/10 bg-ink-800/60 p-5">
      <h3 className="font-display text-sm font-semibold text-paper-50">{lang}</h3>
      <div className="mt-3 flex items-center justify-between rounded-md bg-ink-950 px-3 py-2">
        <code className="truncate font-mono text-xs text-paper-200/80">{cmd}</code>
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(cmd);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          aria-label={`Copy ${lang} install command`}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-signal-green" /> : <Copy className="h-3.5 w-3.5 text-paper-200/40" />}
        </button>
      </div>
      <a
        href="https://jack-wallet-primitive.mintlify.site/"
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-block text-xs text-blue-500 hover:underline"
      >
        Documentation →
      </a>
    </div>
  );
}

export function SdkSection() {
  return (
    <section id="sdks" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="mb-10 font-display text-3xl font-semibold text-paper-50">SDKs for every stack.</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SDKS.map((s) => (
          <SdkCard key={s.lang} {...s} />
        ))}
      </div>
    </section>
  );
}
