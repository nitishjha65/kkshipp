"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { PostForm } from "@/components/post-form";
import { usePathname } from "next/navigation"; // Import usePathname
import { metadata } from "./metadata"; // Import metadata
import Navbar from "@/components/home/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current pathname

  return (
    <html lang="en">
      <body className={inter.className}>
        {pathname !== "/" && ( // Only render navbar if the page is not the homepage
          // <nav className=" bg-[#F3F4F6] shadow-sm h-20 border">
          <nav className=" bg-cyan-300 shadow-sm h-20 border">
            <Navbar />
          </nav>
        )}
        {children}
      </body>
    </html>
  );
}
