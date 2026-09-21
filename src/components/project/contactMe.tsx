"use client";

import { useRef, useState } from "react";
import { IconArrowUpRight } from "@tabler/icons-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactMe() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    emailRef.current = e.target.value;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current.trim();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="flex items-end gap-6 border-b border-ink pb-3 max-w-xl"
      >
        <input
          type="email"
          required
          onChange={handleChange}
          placeholder="you@email.com"
          aria-label="Your email address"
          className="flex-1 min-w-0 bg-transparent font-serif italic text-xl md:text-2xl text-ink placeholder:text-ink-mute outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex items-center gap-1.5 mono-label text-[11px] uppercase text-ink-mute hover:text-brand-text transition-colors pb-1 shrink-0 disabled:opacity-50"
        >
          {status === "loading" ? "Sending" : "Send"}
          <IconArrowUpRight className="h-4 w-4" />
        </button>
      </form>
      <div className="h-6 mt-4">
        {status === "success" && (
          <p className="text-sm text-brand-text">
            Sent! Check your inbox, I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && <p className="text-sm text-destructive">{errorMessage}</p>}
      </div>
    </div>
  );
}
