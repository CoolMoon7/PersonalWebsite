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

