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

  const active =
    scenario.samples.find((s) => s.id === activeId) ?? scenario.samples[0]!;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(active.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-800 shadow-2xl shadow-black/40">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-white/5 p-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Tabs */}
        <div className="flex w-full gap-1 overflow-x-auto scrollbar-none">
          {scenario.samples.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={cn(
                "relative shrink-0 whitespace-nowrap px-3 py-2 text-xs font-medium transition sm:px-3 sm:py-3",
                activeId === s.id
                  ? "text-paper-50"
                  : "text-paper-200/40 hover:text-paper-200/70"
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

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex self-end items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-paper-200/50 transition hover:text-paper-50 sm:self-auto"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-signal-green" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}

          <span className="hidden sm:inline">
            {copied ? "Copied" : "Copy"}
          </span>
        </button>
      </div>

      {/* Code */}
      <div className="relative h-[320px] overflow-auto p-4 touch-pan-x touch-pan-y sm:h-64 sm:p-5">
        <AnimatePresence mode="wait">
          <motion.pre
            key={`${scenario.id}-${active.id}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="min-w-max font-mono text-[11px] leading-relaxed text-paper-100/90 sm:text-[13px]"
          >
            <code>{active.code}</code>
          </motion.pre>
        </AnimatePresence>
      </div>
    </div>
  );
}