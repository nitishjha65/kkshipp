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

export const getColorByLetter = (letter: string): any => {
  const colors: any = {
    A: "#FF5733", // Red
    B: "#33FF57", // Green
    C: "#3357FF", // Blue
    D: "#F4D03F", // Yellow
    E: "#9B59B6", // Purple
    F: "#1ABC9C", // Teal
    G: "#F39C12", // Orange
    H: "#D35400", // Dark Orange
    I: "#8E44AD", // Violet
    J: "#2980B9", // Light Blue
    K: "#16A085", // Sea Green
    L: "#2C3E50", // Dark Blue
    M: "#E67E22", // Pumpkin
    N: "#1d4ed8", // Gray
    O: "#2ECC71", // Emerald
    P: "#E74C3C", // Red
    Q: "#8E44AD", // Purple
    R: "#34495E", // Dark Blue
    S: "#16A085", // Sea Green
    T: "#F39C12", // Orange
    U: "#D35400", // Dark Orange
    V: "#9B59B6", // Purple
    W: "#F4D03F", // Yellow
    X: "#FF5733", // Red
    Y: "#33FF57", // Green
    Z: "#2980B9", // Light Blue
  };

  return colors[letter?.toUpperCase()] || "#7F8C8D"; // Default color is gray
};
