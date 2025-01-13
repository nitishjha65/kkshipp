import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: () => void;
}

function SignUpModal({ isOpen, onClose, onSwitch }: SignUpModalProps) {
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // alert("Passwords don't match!");
      setError("Passwords don't match!");
      return;
    } else {
      setError("");
    }
    // Here you would typically handle the sign-up logic
    console.log("Sign up with:", userName, email, password);

    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/signup", {
        userName,
        email,
        password,
      });

      if (response?.data?.status == 200) {
        console.log("Login successsssss", response.data);
        const success = response?.data?.message;
        setError(success);
        // onClose()
        onSwitch();
      } else {
        const err = response?.data?.error;

        setError(err ?? "Unable to signup");
      }
    } catch (error: any) {
      console.log("Signup failed", error.message);
    } finally {
      setIsLoading(false);
    }

    // Reset form
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogDescription>
            Create a new account by entering your username, email and password.
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Username</Label>
            <Input
              id="username"
              type="username"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
              onChange={(e) => setPassword(e?.target?.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e?.target?.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-red-500 text-white hover:bg-red-600 active:bg-red-500 transition-all"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Sign Up"
            )}{" "}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500">
            Already have an account?{" "}
          </span>
          <Button variant="link" onClick={onSwitch} className="p-0">
            Sign In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SignUpModal;
