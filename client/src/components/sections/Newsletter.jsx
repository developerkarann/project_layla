import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (email.trim()) setEmail("");
  }

  return (
    <section className="flex  flex-col bg-reiki-bg-stripe px-4 py-8 sm:py-30 md:px-18 md:py-12 mt-20">
      <div className="mx-auto flex flex-1 px-4 sm:py-30 sm:px-6 md:px-8 lg:px-0 flex-col justify-center w-full max-w-7xl">
        <div className="flex flex-col items-stretch gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-20 w-full">
          {/* Left: serif italic, dark grey, left-aligned, moderate size */}
          <p className="text-left font-serif text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl italic text-reiki-newsletter-text leading-tight">
            Subscribe to our newsletter & be informed about news and offers
          </p>
          {/* Right: single bordered container with input + button */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-full sm:max-w-md flex-row overflow-hidden border border-reiki-newsletter-border shrink-0"
          >
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 sm:px-6 sm:py-4 font-sans text-sm text-reiki-newsletter-text placeholder:text-reiki-newsletter-placeholder focus:outline-none"
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              className="shrink-0 border-l border-reiki-newsletter-border px-4 py-2 sm:px-5 sm:py-2.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wide text-reiki-newsletter-text transition hover:bg-reiki-section-alt/50"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
