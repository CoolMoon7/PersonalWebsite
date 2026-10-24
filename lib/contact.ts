import { z } from "zod";
import { roles, teamSizes, amsOptions, lines, serviceValues } from "@/lib/contact-options";


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
