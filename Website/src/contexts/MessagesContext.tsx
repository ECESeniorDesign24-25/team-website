import React, { createContext, useContext, useState } from 'react';

// message object
interface Message {
    to: string;
    from: string;
    messageBody: string;
    timestamp: number;
}

// parameters for the global store
interface MessagesContextValue {

    // global list of messages
    messages: Message[];

    // function to add a new message
    addMessage: (to: string, from: string, messageBody: string) => void;
}

// parameters for the provider component
interface MessagesProviderProps {

    // wrapped components
    children?: React.ReactNode;
}

// global store for messages, initialized with an empty message list
const MessagesContext = createContext<MessagesContextValue>({
    messages: [],

    // placeholder
    addMessage: () => {}
});

// provider to wrap components
export const MessagesProvider: React.FC<MessagesProviderProps> = ({ children }) => {

    // message state
    const [messages, setMessages] = useState<Message[]>([]);

    // This function updates the messages list by appending a new message.
    const addMessage = (to: string, from: string, messageBody: string) => {
        const newMessage: Message = {to, from, messageBody, timestamp: Date.now()};

        // update the message list
        setMessages(prevMessages => {

            // add the new message
            prevMessages.push(newMessage);
            return prevMessages;
        });
    };

    // return the provider and its children
    return (
    <MessagesContext.Provider value={{ messages, addMessage }}>
        {children}
    </MessagesContext.Provider>
    );
};

// hook for using the global store in a component
export const useMessages = () => useContext(MessagesContext);
