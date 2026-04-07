"use client";

import { useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import SplitText from "@/components/ui/SplitText";

gsap.registerPlugin(ScrollTrigger);

// ─── Replace with your Formspree form ID ─────────────────────────────────────
// Get it free at https://formspree.io — takes 30 seconds
const FORMSPREE_ID = "xpwzovdb"; // ← swap this

// ─── Enquiry types ────────────────────────────────────────────────────────────
const ENQUIRY_TYPES = [
  "New Project",
  "Consultation",
  "Collaboration",
  "Press / Media",
  "Careers",
  "Other",
] as const;

type EnquiryType = typeof ENQUIRY_TYPES[number];

// ─── Animated input field ─────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  className?: string;
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  error,
  className,
}: FieldProps) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  const onFocus = () => {
    gsap.to(lineRef.current, { scaleX: 1, duration: 0.4, ease: "power3.out" });
    gsap.to(labelRef.current, { y: -4, color: "var(--accent)", duration: 0.3 });
  };

  const onBlur = () => {
    gsap.to(lineRef.current, { scaleX: 0, duration: 0.35, ease: "power2.in" });
    gsap.to(labelRef.current, { y: 0, color: "var(--text-tertiary)", duration: 0.3 });
  };

  return (
    <div ref={wrapRef} className={cn("relative flex flex-col gap-2", className)}>
      <label
        ref={labelRef}
        htmlFor={name}
        className="font-condensed text-[10px] font-bold uppercase tracking-[0.4em] text-text-tertiary transition-colors"
      >
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>

      <div className="relative">
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            required={required}
            placeholder={placeholder}
            rows={5}
            onFocus={onFocus}
            onBlur={onBlur}
            className="w-full resize-none bg-transparent py-3 font-body text-base text-text-primary placeholder:text-text-tertiary/50 focus:outline-none"
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            required={required}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            className="w-full bg-transparent py-3 font-body text-base text-text-primary placeholder:text-text-tertiary/50 focus:outline-none"
          />
        )}

        {/* Static underline */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-border" />
        {/* Active accent underline — grows on focus */}
        <div
          ref={lineRef}
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
          aria-hidden="true"
        />
      </div>

      {error && (
        <p className="font-condensed text-[10px] uppercase tracking-widest text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Success state ────────────────────────────────────────────────────────────

function SuccessMessage() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const els = ref.current?.querySelectorAll(".success-el");
      if (!els?.length) return;
      gsap.fromTo(
        Array.from(els),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="flex flex-col items-start gap-8 py-16">
      <div className="success-el h-16 w-[2px] bg-accent" />
      <div className="success-el">
        <p className="mb-3 font-condensed text-[11px] font-bold uppercase tracking-[0.5em] text-accent">
          Message Received
        </p>
        <h3 className="font-display text-5xl uppercase leading-tight text-text-primary md:text-7xl">
          We'll Be<br />In Touch.
        </h3>
      </div>
      <p className="success-el max-w-md font-body text-lg font-light leading-relaxed text-text-secondary">
        Thank you for reaching out. Someone from our studio will respond within 2 business days.
      </p>
      <div className="success-el h-px w-32 bg-accent/30" />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [activeType, setActiveType] = useState<EnquiryType>("New Project");
  const [formState, submit] = useForm(FORMSPREE_ID);

  const pageRef    = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const chars = headingRef.current?.querySelectorAll(".contact-char");
      const label = headingRef.current?.querySelector(".contact-label");

      if (chars?.length) gsap.set(Array.from(chars), { yPercent: 110, opacity: 0 });
      if (label) gsap.set(label, { opacity: 0, y: 16 });

      const tl = gsap.timeline({ delay: 0.4 });

      if (label) {
        tl.to(label, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
      }

      if (chars?.length) {
        tl.to(
          Array.from(chars),
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            stagger: { amount: 0.4 },
          },
          "-=0.4"
        );
      }

      // Form slides up
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.6,
          }
        );
      }

      // Info column stagger
      const infoItems = infoRef.current?.querySelectorAll(".info-item");
      if (infoItems?.length) {
        gsap.fromTo(
          Array.from(infoItems),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.8,
          }
        );
      }
    },
    { scope: pageRef }
  );

  return (
    <main ref={pageRef} className="min-h-screen w-full bg-bg-primary pt-32 pb-24 md:pt-40 md:pb-32">

      {/* ── Page heading ───────────────────────────────────────────────── */}
      <div className="px-6 md:px-20">
        <div ref={headingRef} className="mb-20 md:mb-28">
          <p className="contact-label mb-6 font-condensed text-[11px] font-bold uppercase tracking-[0.5em] text-accent">
            — Start a Conversation
          </p>
          <div className="overflow-hidden" aria-label="Contact us">
            <h1 className="font-display text-[20vw] uppercase leading-[0.85] tracking-tight text-text-primary md:text-[13vw] lg:text-[10vw]">
              <SplitText text="CONTACT" charClassName="contact-char" />
            </h1>
          </div>
        </div>
      </div>

      {/* ── Main grid ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-20 px-6 md:grid-cols-[1fr_2fr] md:gap-24 md:px-20 lg:grid-cols-[340px_1fr]">

        {/* ── Left: Info column ─────────────────────────────────────── */}
        <div ref={infoRef} className="flex flex-col gap-12">

          {/* Office */}
          <div className="info-item flex flex-col gap-3">
            <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
              Studio Address
            </p>
            <p className="font-body text-sm font-light leading-relaxed text-text-secondary">
              12, Adyar Bridge Road<br />
              Adyar, Chennai 600 020<br />
              Tamil Nadu, India
            </p>
            <p className="font-condensed text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
              13.0827° N, 80.2707° E
            </p>
          </div>

          {/* Contact details */}
          <div className="info-item flex flex-col gap-3">
            <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
              Direct Contact
            </p>
            <a
              href="mailto:studio@enbuilt.com"
              className="font-body text-sm text-text-primary underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              studio@enbuilt.com
            </a>
            <a
              href="tel:+914442244224"
              className="font-body text-sm text-text-secondary underline-offset-4 transition-colors hover:text-text-primary hover:underline"
            >
              +91 44 4224 4224
            </a>
          </div>

          {/* Studio hours */}
          <div className="info-item flex flex-col gap-3">
            <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
              Studio Hours
            </p>
            <div className="flex flex-col gap-1 font-condensed text-[11px] uppercase tracking-[0.25em] text-text-secondary">
              <div className="flex justify-between gap-8">
                <span>Mon – Fri</span>
                <span className="text-text-primary">09:00 – 19:00</span>
              </div>
              <div className="flex justify-between gap-8">
                <span>Saturday</span>
                <span className="text-text-primary">10:00 – 14:00</span>
              </div>
              <div className="flex justify-between gap-8">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

          {/* Vertical accent line + note */}
          <div className="info-item hidden items-start gap-6 md:flex">
            <div className="mt-1 h-24 w-[2px] shrink-0 bg-accent" />
            <p className="font-editorial text-base italic leading-relaxed text-text-tertiary">
              All projects begin with a single conversation. We respond to every inquiry personally.
            </p>
          </div>
        </div>

        {/* ── Right: Form ────────────────────────────────────────────── */}
        <div ref={formRef} style={{ opacity: 0 }}>
          {formState.succeeded ? (
            <SuccessMessage />
          ) : (
            <form
              onSubmit={submit}
              noValidate
              className="flex flex-col gap-12"
            >
              {/* Enquiry type selector */}
              <div className="flex flex-col gap-4">
                <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.4em] text-text-tertiary">
                  Enquiry Type <span className="text-accent">*</span>
                </p>
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-label="Select enquiry type"
                >
                  {ENQUIRY_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setActiveType(type)}
                      aria-pressed={activeType === type}
                      className={cn(
                        "px-5 py-2.5 font-condensed text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-200",
                        activeType === type
                          ? "bg-accent text-white"
                          : "border border-border text-text-secondary hover:border-accent/40 hover:text-text-primary"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {/* Hidden field so Formspree receives the type */}
                <input type="hidden" name="enquiryType" value={activeType} />
              </div>

              {/* Name + Email row */}
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <Field
                  label="Full Name"
                  name="name"
                  required
                  placeholder="Ar. John Smith"
                  error={
                    (formState.errors as any)?.find?.((e: any) => e.field === "name")?.message
                  }
                />
                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  required
                  placeholder="john@studio.com"
                  error={
                    (formState.errors as any)?.find?.((e: any) => e.field === "email")?.message
                  }
                />
              </div>

              {/* Company + Location row */}
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <Field
                  label="Organisation / Firm"
                  name="organisation"
                  placeholder="Optional"
                />
                <Field
                  label="Project Location"
                  name="projectLocation"
                  placeholder="City, Country"
                />
              </div>

              {/* Budget */}
              <div className="flex flex-col gap-4">
                <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.4em] text-text-tertiary">
                  Approximate Budget
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Under ₹50L",
                    "₹50L – ₹2Cr",
                    "₹2Cr – ₹10Cr",
                    "₹10Cr+",
                    "Not Sure Yet",
                  ].map((b) => (
                    <label
                      key={b}
                      className="group flex cursor-pointer items-center gap-2 border border-border px-4 py-2 font-condensed text-[10px] font-bold uppercase tracking-[0.25em] text-text-secondary transition-colors has-[input:checked]:border-accent/50 has-[input:checked]:bg-accent/5 has-[input:checked]:text-accent hover:border-border hover:text-text-primary"
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={b}
                        className="sr-only"
                      />
                      {b}
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <Field
                label="Tell Us About Your Project"
                name="message"
                type="textarea"
                required
                placeholder="Describe your vision, site, programme, and any constraints you'd like us to know about..."
                error={
                  (formState.errors as any)?.find?.((e: any) => e.field === "message")?.message
                }
              />

              {/* Submit */}
              <div className="flex items-center gap-8">
                <button
                  type="submit"
                  disabled={formState.submitting}
                  className="group relative overflow-hidden bg-accent px-12 py-5 font-condensed text-[11px] font-bold uppercase tracking-[0.3em] text-white transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="relative z-10">
                    {formState.submitting ? "Sending…" : "Send Message"}
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
                </button>

                <p className="font-condensed text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
                  We respond within 2 business days
                </p>
              </div>

              {/* Global form error */}
              {formState.errors && (formState.errors as any).length > 0 && (
                <p className="font-condensed text-[11px] uppercase tracking-widest text-accent">
                  Please fix the errors above and try again.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
