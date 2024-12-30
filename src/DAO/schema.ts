import { UserRole } from "./Enums";

export interface LoginResponse {
    error: string;
    message: string;
    status: string;
    data: {
        accountLocked: null | boolean;
        bio: null | string;
        createdAt: null | Date;
        email: null | string;
        emailVerified: null | string;
        isActive: null | boolean;
        jwtToken: null | string;
        lastLogin: null | Date;
        loginAttempts: null | number;
        name: null | string;
        passwordHash: null | string;
        profilePicturePath: null | string;
        role: null | UserRole;
        updatedAt: null;
        userId: null;
    }
};

export interface NavbarProps {
    isAuthenticated: boolean;
    name: string;
    onAutheChange: () => void;
}