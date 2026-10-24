import { z } from "zod";
import { services } from "@/content/services";

export const intents = [
  { value: "audit", label: "Book an AI audit", submit: "Request my audit" },
  { value: "quote", label: "Request a quote", submit: "Request my quote" },
  { value: "talk", label: "Just talk", submit: "Send message" },
] as const;
export type Intent = (typeof intents)[number]["value"];

export const roles = ["Owner or principal", "Operations manager", "Service team lead", "Producer", "Other"] as const;
export const teamSizes = ["1 to 5", "6 to 15", "16 to 30", "31 or more"] as const;
/** The one place management systems are named: the form has to ask which one the agency uses. */
export const amsOptions = ["AMS360", "Applied Epic", "HawkSoft", "EZLynx", "Momentum AMP (formerly NowCerts)", "QQCatalyst", "Other", "Not sure"] as const;
export const lines = ["Commercial", "Personal", "Benefits"] as const;
export const NOT_SURE = "not-sure";
export const serviceValues = [NOT_SURE, ...services.map((s) => s.slug)] as [string, ...string[]];

export const contactSchema = z.object({
  intent: z.enum(["audit", "quote", "talk"]),
  name: z.string().trim().min(1, "Enter your name.").max(120),
  agency: z.string().trim().min(1, "Enter your agency name.").max(160),
  email: z.string().trim().min(1, "Enter your work email.").email("Enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional().default(""),
  role: z.enum(roles).optional(),
  teamSize: z.enum(teamSizes).optional(),
  ams: z.enum(amsOptions).optional(),
  lines: z.array(z.enum(lines)).default([]),
  timeSinks: z.array(z.enum(serviceValues)).default([]),
  interested: z.array(z.enum(serviceValues)).default([]),
  message: z.string().trim().max(1000, "Keep it under 1,000 characters.").optional().default(""),
  /** Honeypot: real visitors never fill this. */
  website: z.string().max(0).optional().default(""),
  /** Epoch ms when the form first rendered, for the minimum time-to-submit check. */
  startedAt: z.number(),
});
export type ContactInput = z.infer<typeof contactSchema>;
