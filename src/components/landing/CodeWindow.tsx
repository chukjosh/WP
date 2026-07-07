"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import type { SampleScenario } from "@/constants/code-samples";
import { cn } from "@/utils/cn";

interface CodeWindowProps {
  scenario: SampleScenario;
}

export function CodeWindow({ scenario }: CodeWindowProps) {
  const [activeId, setActiveId] = useState(scenario.samples[0]!.id);
  const [copied, setCopied] = useState(false);
  const active = scenario.samples.find((s) => s.id === activeId) ?? scenario.samples[0]!;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(active.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-800 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-white/5 px-2">
        <div className="flex gap-1 overflow-x-auto">
          {scenario.samples.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={cn(
                "relative whitespace-nowrap px-3 py-3 text-xs font-medium transition",
                activeId === s.id ? "text-paper-50" : "text-paper-200/40 hover:text-paper-200/70"
              )}
            >
              {s.label}
              {activeId === s.id && (
                <motion.div
                  layoutId="code-tab-underline"
                  className="absolute inset-x-2 bottom-0 h-px bg-amber-500"
                />
              )}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="mr-2 flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-paper-200/50 hover:text-paper-50"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-signal-green" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="relative h-64 overflow-auto p-5">
        <AnimatePresence mode="wait">
          <motion.pre
            key={`${scenario.id}-${active.id}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="font-mono text-[13px] leading-relaxed text-paper-100/90"
          >
            <code>{active.code}</code>
          </motion.pre>
        </AnimatePresence>
      </div>
    </div>
  );
}
