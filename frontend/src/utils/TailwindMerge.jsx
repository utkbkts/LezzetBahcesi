import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export function cn(...classes) {
  return twMerge(clsx(...classes));
}
