"use client";

import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/XXXXXXXX"; // <- replace with your endpoint

type FormState = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("ok");
        setFormData({ name: "", email: "", message: "" });
        return;
      }

      // parse error body without using `any`
      const body: unknown = await res.json().catch(() => ({}));
      const msg =
        typeof body === "object" &&
        body !== null &&
        "error" in body &&
        typeof (body as { error?: string }).error === "string"
          ? (body as { error: string }).error
          : "Something went wrong. Please try again.";

      setError(msg);
      setStatus("error");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error";
      setError(msg);
      setStatus("error");
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Contact Us</h1>
      <p className="opacity-80">
        You can also email us directly at{" "}
        <a href="mailto:fikzdcars@gmail.com" className="underline text-blue-500">
          fikzdcars@gmail.com
        </a>
        .
      </p>

      {status === "ok" ? (
        <p className="text-green-500 text-lg">
          Thanks! Your message was sent.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg bg-black text-white"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg bg-black text-white"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full p-3 border rounded-lg bg-black text-white"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
          />
          {status === "error" && (
            <p className="text-red-500">{error ?? "Submission failed"}</p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>
        </form>
      )}
    </main>
  );
}
