import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define types for the user
interface User {
  username: string;
  email: string;
  id: string;
}

// Define the context type
interface LoginContextType {
  user: User | null;
  login: (userInfo: User) => void;
  logout: () => void;
  checkPostAdded: (status: any) => void;
  isPostsAdded: any;
}

// Create context with a default value
const LoginContext = createContext<LoginContextType | undefined>(undefined);

// Custom hook to use the login context
export const useLogin = (): LoginContextType => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};

// Provider component with children as ReactNode
interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // State to store user data
  const [isPostsAdded, setIsPostsAdded] = useState(false); // This is where posts are stored

  // Function to handle login
  const login = (userInfo: User) => {
    setUser(userInfo); // Set the user data when login is successful
  };

  // Function to handle logout
  const logout = () => {
    setUser(null); // Set user to null when logged out
  };
  console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");

  const checkPostAdded = (status: any) => {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", status);
    setIsPostsAdded((state) => !state);
  };

  useEffect(() => {
    console.log("ispOtsadddd", isPostsAdded);
  }, [isPostsAdded]);

  return (
    <LoginContext.Provider
      value={{ user, login, logout, checkPostAdded, isPostsAdded }}
    >
      {children}
    </LoginContext.Provider>
  );
};
