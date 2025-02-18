import { UserRole } from "./Enums";

export interface LoginResponse {
    error: null | string;
    message: null | string;
    status: null | string;
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
        updatedAt: null | Date;
        userId: null | number;
    }
};

export interface BlogDataDTO {
    blogType: string;
    title: string;
    slug: string;
    dateCreated: string;
    dateUpdated: string;
    authorId: number;
    content: string; // Content is a JSON string, but you may want to parse it if necessary
    imageUrls: string[];
    publishedStatus: boolean;
    description: string;
}

export interface NavbarProps {
    isAuthenticated: boolean;
    onAutheChange: () => void;
}