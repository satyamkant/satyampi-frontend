export interface LoginResponse {
    status: number;
    data: {
        name: string;
    }
};

export interface NavbarProps {
    isAuthenticated: boolean;
    name: string;
    onAutheChange: () => void;
}