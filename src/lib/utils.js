import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


// The Global Affiliate Discount Percentage
export const AFFILIATE_DISCOUNT_PERCENTAGE = 15;