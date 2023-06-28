import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return twMerge(clsx(inputs));
}
