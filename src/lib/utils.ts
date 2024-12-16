import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to verify and decode the token
export const getUserFromToken = async (token: string) => {
  console.log("getUserFromToken called");
  try {
    const secret = process.env.TOKEN_SECRET!; // Ensure you use the correct secret

    // Decode the token using the secret key
    const decoded = jwt.verify(token, secret) as any; // Adjust according to your token payload

    console.log("Decoded token:", decoded);

    // Return decoded data (user info)
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error); // Log the error for better debugging
    return null; // If token is invalid or expired, return null
  }
};

export const formatDate = (input: string | Date): string => {
  const date = new Date(input);

  // Define an array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  // Get the day, month, and year
  const day = date.getUTCDate();
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  // Format the date
  return `${month} ${day}, ${year}`;
};
