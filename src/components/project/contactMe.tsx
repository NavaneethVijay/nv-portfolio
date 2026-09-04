"use client";

import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

export default function ContactMe() {
  const placeholders = [
    "What are you building?",
    "Got a role that needs a senior engineer?",
    "Want to collaborate on something ambitious?",
    "Have an AI feature you want shipped?",
    "Just want to say hi?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
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
    </div>
  );
}
