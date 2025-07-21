import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safely cleans HTML content by removing malformed tags and handling edge cases
 * @param htmlString - The HTML string to clean
 * @returns Cleaned HTML string
 */
export function cleanHtml(htmlString: string): string {
  if (!htmlString) return '';

  // Clean up common HTML issues
  let cleanedHtml = htmlString
    // Remove any unclosed tags that might cause issues
    .replace(/<([^>]*)$/g, '') // Remove incomplete tags at the end
    .replace(/^([^<]*)>/g, '') // Remove incomplete closing tags at the start
    // Fix common malformed tags
    .replace(/<i>/g, '<em>')
    .replace(/<\/i>/g, '</em>')
    .replace(/<b>/g, '<strong>')
    .replace(/<\/b>/g, '</strong>')
    // Remove any script tags for security
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Ensure proper spacing
    .trim();

  return cleanedHtml;
}
