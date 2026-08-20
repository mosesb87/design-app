import { useState } from "react";

interface Props {
  code: string;
}

export function CodeBlock({ code }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Clipboard may be unavailable; fall back to a visual confirmation only.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
      <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-sm text-emerald-200">
        {code}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute right-3 top-3 rounded-lg bg-white/10 px-3 py-1 text-xs font-medium text-white transition hover:bg-white/20"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
