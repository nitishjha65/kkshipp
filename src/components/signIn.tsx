import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // Import Loader2 icon from lucide-react
import SignUpModal from "./signUp";
import React, { createContext, useContext } from "react";
import { useLogin } from "@/lib/loginContext";

// interface SignInModalProps {
//   isButton?: boolean; // Optional prop
// }

export function SignInModal({ open, setOpen }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isSignup, setIsSignUp] = useState(false);
  const { user, login, logout } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });

      if (response?.data?.status == 200) {
        // console.log("Login successsssss", response.data);
        const success = response?.data?.message;
        setResponseMessage(success);
        setOpen(false);
        login(response?.data);

        // router.push("/profile");
      } else {
        const err = response?.data?.error;

        setResponseMessage(err ?? "Unable to Login");
      }
    } catch (error: any) {
      console.log("Login failed", error.message);
    } finally {
      setIsLoading(false);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <>
      {/*      
        <Button
          onClick={() => setOpen(true)}
          className=" p-2 z-[1001] font-extrabold text-black bg-white border-2 border-solid border-white hover:bg-transparent hover:text-white transition-all duration-300 ease-in-out"
        >
          Login
        </Button>
   */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            {responseMessage && (
              <div className="text-red-500 text-sm">{responseMessage}</div>
            )}
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-red-500 text-white hover:bg-red-600 active:bg-red-500 transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500">
              Don't have an account?{" "}
            </span>
            <Button
              variant="link"
              className="p-0"
              onClick={() => {
                setIsSignUp(true);
                setOpen(false);
              }}
            >
              Sign Up
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {isSignup && (
        <SignUpModal
          isOpen={isSignup}
          onClose={() => setIsSignUp(false)}
          onSwitch={() => {
            setOpen(true);
            setIsSignUp(false);
          }}
        />
      )}
    </>
  );
}
