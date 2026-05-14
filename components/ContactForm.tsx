"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = encodeURIComponent("Portfolio inquiry");
    const body = encodeURIComponent(message);

    window.location.href = `mailto:colebonawitz@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="border border-border p-5 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-border bg-background text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-border-dark"
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-border bg-background text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-border-dark"
        />
      </div>

      <textarea
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={5}
        className="w-full px-3 py-2 border border-border bg-background text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-border-dark mb-3 resize-y"
      />

      <button
        type="submit"
        className="hover-lift px-5 py-2 border border-border text-foreground text-xs font-medium"
      >
        Send Message
      </button>
    </form>
  );
}
