'use client';

import { User } from "@/types/user";
import { createContext, useContext, useState } from "react";

const UserContext = createContext<{ user: User | null, setUser: (user: User | null) => void }>({ user: null, setUser: () => { } });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    return (
        <UserContext.Provider value={{ user, setUser }
        }>
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
