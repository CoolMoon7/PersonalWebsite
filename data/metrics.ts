export interface Metric {
  value: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export const heroMetrics: Metric[] = [
  {
    value: "$135K+",
    numericValue: 135,
    prefix: "$",
    suffix: "K+",
    label: "E-commerce revenue generated",
  },
  {
    value: "5M+",
    numericValue: 5,
    suffix: "M+",
    label: "Instagram/TikTok views generated",
  },
  {
    value: "$15K+",
    numericValue: 15,
    prefix: "$",
    suffix: "K+",
    label: "Duke grants & funding raised",
  },
  {
    value: "3,500+",
    numericValue: 3500,
    suffix: "+",
    label: "Products shipped to customers",
  },
  {
    value: "1,000+",
    numericValue: 1000,
    suffix: "+",
    label: "Five-star reviews",
  },
  {
    value: "600",
    numericValue: 600,
    suffix: "",
    label: "Hardware units manufactured",
  },
];
