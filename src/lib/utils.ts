import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, format = "DD MMM YYYY") {
  return dayjs(date).format(format);
}

export function validateImage(file: File, maxSizeMB = 5) {
  if (!file.type.startsWith("image/")) {
    return { valid: false, error: "File must be an image." };
  }

  const maxSize = maxSizeMB * 1024 * 1024;
  if (file.size > maxSize) {
    return { valid: false, error: `File size must be under ${maxSizeMB}MB.` };
  }

  return { valid: true, error: null };
}
