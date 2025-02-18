import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { UserDetails } from "./UserDetails";


interface AuthContextType {
    user: UserDetails | null;
    setUser: (user: UserDetails | null) => void;
    logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserDetails | null>(null);

    // Load user from localStorage when app starts
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};