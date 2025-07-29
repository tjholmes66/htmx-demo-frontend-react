// src/context/UserContext.ts
import {createContext, type ReactNode, useState} from 'react';

interface UserContextType {
    username: string;
    email: string;
    updateUser: (newUsername: string, newEmail: string) => void;
}

// Create the context with a default value (can be null or an initial object)
export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
    children: ReactNode;
}

// Create a Provider component to encapsulate the context logic
export const UserProvider = ({ children }: UserProviderProps) => {
    // You would typically manage state here, e.g., using useState
    const [user, setUser] = useState({ username: 'Guest', email: 'guest@example.com' });

    const updateUser = (newUsername: string, newEmail: string) => {
        setUser({ username: newUsername, email: newEmail });
    };

    const contextValue: UserContextType = {
        username: user.username,
        email: user.email,
        updateUser,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};