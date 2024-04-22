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

export function dateFormatter(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const output = {
    hoverDate: `${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
    formattedDate: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  };

  if (diffMinutes < 5) {
    output.formattedDate = "now";
  } else if (diffMinutes < 60) {
    output.formattedDate = `${diffMinutes}m`;
  } else if (diffMinutes < 24 * 60) {
    output.formattedDate = `${Math.floor(diffMinutes / 60)}h`;
  }

  return output;
}
