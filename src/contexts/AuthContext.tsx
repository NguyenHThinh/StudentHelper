'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
    email: string;
    name: string;
}

interface AuthContextType {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProfile = async (token: string) => {
        try {
            const profileResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/user`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (profileResponse.data.success) {
                setUser(profileResponse.data.data);
            }
        } catch (e) {
            console.error('Error fetching profile:', e);
        }
    };

    // On app load, try to restore session from refreshToken cookie
    useEffect(() => {
        const restoreSession = async () => {
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                if (response.data.success && response.data.data.accessToken) {
                    const token = response.data.data.accessToken;
                    setAccessToken(token);
                    await fetchProfile(token);
                }
            } catch (error) {
                setAccessToken(null);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        restoreSession();
    }, []);

    // Set token getter for axios
    useEffect(() => {
        const { setTokenGetter } = require('@/lib/axios');
        setTokenGetter(() => accessToken);
    }, [accessToken]);

    // Listen for events from axios interceptor
    useEffect(() => {
        const handleTokenRefresh = async (event: any) => {
            const token = event.detail.accessToken;
            setAccessToken(token);
            await fetchProfile(token);
        };

        const handleLogout = () => {
            setAccessToken(null);
            setUser(null);
        };

        window.addEventListener('token-refreshed', handleTokenRefresh);
        window.addEventListener('auth-logout', handleLogout);

        return () => {
            window.removeEventListener('token-refreshed', handleTokenRefresh);
            window.removeEventListener('auth-logout', handleLogout);
        };
    }, []);

    const logout = async () => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
                {},
                { withCredentials: true }
            );
        } catch (e) {
            console.error('Logout API call failed:', e);
        } finally {
            setAccessToken(null);
            setUser(null);
        }
    };

    const isAuthenticated = !!accessToken;

    return (
        <AuthContext.Provider value={{
            accessToken,
            setAccessToken,
            user,
            setUser,
            isAuthenticated,
            isLoading,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
