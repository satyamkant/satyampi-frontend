

interface LoginResponse {
    status: number;
    data: {
        userDto: {
            name: string;
        };
    };
}

interface NavbarProps {
    isAuthenticated: boolean;
    name: string;
    onAutheChange: () => void;
}