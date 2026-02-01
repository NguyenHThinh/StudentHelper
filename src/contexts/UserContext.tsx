'use client';

import { User } from "@/types/user";
import { createContext, useContext, useState } from "react";

const UserContext = createContext<{ user: User | null, setUser: (user: User | null) => void, isAuthLoading: boolean, setIsAuthLoading: (isAuthLoading: boolean) => void }>({
    user: null,
    setUser: () => { },
    isAuthLoading: true,
    setIsAuthLoading: () => { }
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    return (
        <UserContext.Provider value={{ user, setUser, isAuthLoading, setIsAuthLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
