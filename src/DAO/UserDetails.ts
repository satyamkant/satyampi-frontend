import { UserRole } from "./Enums";

export interface UserDetails {
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
    updatedAt: null | Date;
    userId: null | number;
}