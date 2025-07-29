import {createContext, type ReactNode, useState} from 'react';

interface ContactContextType {
    contactId: number;
    updateContact: (newContactId: number) => void;
}

// Create the context with a default value (can be null or an initial object)
export const ContactContext = createContext<ContactContextType | null>(null);

interface ContactProviderProps {
    children: ReactNode;
}

// Create a Provider component to encapsulate the context logic
export const ContactProvider = ({ children }: ContactProviderProps) => {
    // You would typically manage state here, e.g., using useState
    const [contact, setContact] = useState({ contactId: 0});

    const updateContact = (newContactId: number) => {
        setContact({ contactId: newContactId});
    };

    const contextValue: ContactContextType = {
        contactId: contact.contactId,
        updateContact,
    };

    return (
        <ContactContext.Provider value={contextValue}>
            {children}
        </ContactContext.Provider>
    );
};