import  { createContext, useState } from 'react';

interface ContactContextType {
    contactId: number;
    updateContactId: (newContactId: number) => void;
}

export const ContactContext = createContext<ContactContextType | undefined>(undefined);

interface ContactContextProviderProps {
    children: React.ReactNode;
}

export const ContactContextProvider: React.FC<ContactContextProviderProps> = ({ children }) => {
    const [myContactId, setContactId] = useState<number>(999);

    const updateContactId = (newContactId: number) => {
        setContactId(newContactId);
    };

    const contextValue: ContactContextType = {
        contactId: myContactId,
        updateContactId: updateContactId,
    };

    return (
        <ContactContext.Provider value={contextValue}>
            {children}
        </ContactContext.Provider>
    );
};