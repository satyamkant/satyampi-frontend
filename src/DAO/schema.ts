export interface LoginResponse {
    status: number;
    data: {
        userDto: {
            name: string;
        };
    };
}

export interface NavbarProps {
    isAuthenticated: boolean;
    name: string;
    onAutheChange: () => void;
}