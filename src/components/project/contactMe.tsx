"use client";

import { useRef, useState } from "react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactMe() {
  const placeholders = [
    "What are you building?",
    "Got a role that needs a senior engineer?",
    "Want to collaborate on something ambitious?",
    "Have an AI feature you want shipped?",
    "Just want to say hi?",
  ];

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
    <div className="flex flex-col justify-center items-center px-4">
      <h3 className="text-center text-lg font-medium my-4 text-ink-soft font-body">
        Drop in your email and I'll get back to you.
      </h3>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      <div className="h-6 mt-3">
        {status === "loading" && (
          <p className="text-sm text-ink-mute font-body">Sending…</p>
        )}
        {status === "success" && (
          <p className="text-sm text-brand-text font-body">
            Sent! Check your inbox — I'll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-500 font-body">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
