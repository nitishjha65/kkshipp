"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { PostForm } from "@/components/post-form";
import { usePathname } from "next/navigation"; // Import usePathname
import { metadata } from "./metadata"; // Import metadata
import Navbar from "@/components/home/Navbar";
import { LoginProvider } from "@/lib/loginContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current pathname
  const isNavbarVisible = pathname !== "/";

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap the entire content inside LoginProvider to provide the context */}
        <LoginProvider>
          {isNavbarVisible && ( // Only render navbar if the page is not the homepage
            <nav className=" bg-cyan-300 shadow-sm h-16  fixed top-0 left-0 w-full z-[1001]">
              <Navbar />
            </nav>
          )}
          <div className={isNavbarVisible ? "pt-16" : ""}>{children}</div>
        </LoginProvider>
      </body>
    </html>
  );
}
