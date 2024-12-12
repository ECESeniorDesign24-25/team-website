import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import uuid from 'react-native-uuid';
import { showAlert } from '../utils/Alert';

interface Message {
  uuid: string;
  to: string;
  from: string;
  messageBody: string;
  timestamp: number;
}

// global context value
interface MessagesContextValue {
  messages: Message[];
  addMessage: (to: string, from: string, messageBody: string) => void;
  deleteMessage: (id: string) => void;
  clearMessages: () => void;
}

// parameters for the provider
interface MessagesProviderProps {
  children: ReactNode;
}

// global context for accessing/storing/deleting messages
const MessagesContext = createContext<MessagesContextValue>({
  messages: [],
  addMessage: () => {},
  deleteMessage: () => {},
  clearMessages: () => {},
});

// async storage key
const STORAGE_KEY = '@messages';

// Provider component
export const MessagesProvider: React.FC<MessagesProviderProps> = ({ children }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    // Load messages from async storage when the provider mounts
    useEffect(() => {
    const loadMessages = async () => {
        try {
        const storedMessages = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedMessages) {
            
            setMessages(JSON.parse(storedMessages));
        }
        } catch (error) {
            console.error('error loading messages from store:', error);
        }
    };
    
    loadMessages();
    }, []);

    // Save messages to AsyncStorage whenever they change
    useEffect(() => {
    const saveMessages = async () => {
        try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch (error) {
            console.error('Failed to save messages:', error);
            Alert.alert('Error', 'Failed to save messages.');
        }
    };

    saveMessages();
    }, [messages]);

    // Function to add a new message
    const addMessage = (to: string, from: string, messageBody: string) => {
    const newMessage: Message = {

        // unique id for each message
        uuid: uuid.v4() as string,
        to,
        from,
        messageBody,
        timestamp: Date.now(),
    };

        // Update the messages list by adding the new message at the beginning
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
    };

    // Function to delete a message by ID
    const deleteMessage = (id: string) => {
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.uuid !== id));
    };

    // Function to clear all messages
    const clearMessages = () => {
        setMessages([]);
    };

    return (
    <MessagesContext.Provider value={{ messages, addMessage, deleteMessage, clearMessages }}>
        {children}
    </MessagesContext.Provider>
    );
};

// Custom hook to use the MessagesContext
export const useMessages = () => useContext(MessagesContext);
