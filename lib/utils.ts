import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  // Split the name into an array of words
  const words = name.split(" ");

  // Initialize an empty string to store the initials
  let initials = "";

  // Iterate through each word in the array
  for (const word of words) {
    // Append the first character of each word to the initials string
    initials += word.charAt(0).toUpperCase();
  }

  // Return the initials
  return initials;
}
