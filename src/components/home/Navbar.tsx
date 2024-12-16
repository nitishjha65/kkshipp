import React from "react";
import Link from "next/link";
import { PostForm } from "../post-form";
import { SignInModal } from "../signIn";

const Navbar = () => {
  return (
    <header>
      <nav className="relative bg-transparent text-center px-1 py-4">
        <span className="hover:opacity-80 user-select-none text-white mt-2 absolute left-0 md:">
          <Link
            href="/"
            className="px-1 text-2xl font-extrabold border-white leading-5"
          >
            <span> kollab</span>
            {/* <span className="hidden sm:contents">ollab</span> */}
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

          <SignInModal />
          <div className="hidden 1.5lg:block w-40"></div>

          <PostForm />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
