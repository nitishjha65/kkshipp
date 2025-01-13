import React, { useState } from "react";
import Link from "next/link";
import { PostForm } from "../post-form";
import { SignInModal } from "../signIn";
import { Button } from "../ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative">
      <nav className="relative bg-transparent text-center px-1 py-4">
        <span className="hover:opacity-80 user-select-none text-white mt-2 absolute left-0">
          <Link
            href="/"
            className="px-1 text-2xl font-extrabold border-white leading-5"
          >
            <span>kollab</span>
          </Link>
          <Link
            href="/"
            className="px-1 text-2xl font-extrabold border-s-4 border-white leading-5"
          >
            <span>ship</span>
            <span className="text-xs ms-1">®</span>
          </Link>
        </span>

        <div className="absolute flex top-0 right-0 mt-3 me-1 sm:me-3 gap-2">
          <div className="hidden 1.5lg:block w-40"></div>

          <SignInModal open={open} setOpen={setOpen} />

          <Button
            onClick={() => setOpen(true)}
            className="p-2 z-[1001] font-extrabold text-black bg-white border-2 border-solid border-white hover:bg-transparent hover:text-white transition-all duration-300 ease-in-out"
          >
            Login
          </Button>
          <div className="hidden 1.5lg:block w-40"></div>
        </div>
      </nav>

      {/* PostForm - Fixed Position */}
      <div className="fixed bottom-4 right-4 z-[1000] bg-white border border-gray-300 p-4 shadow-lg rounded-md">
        <PostForm />
      </div>
    </header>
  );
};

export default Navbar;
