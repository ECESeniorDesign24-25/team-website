import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { Message, MessagesProviderProps } from "../types/types";

// async storage key
const MSG_STORAGE_KEY = "@messages";

// global context for accessing/storing/deleting messages
const MessagesContext = createContext({
  messages: [],
  addMessage: (to: string, from: string, body: string) => {},
});

// Provider component
export const MessagesProvider: React.FC<MessagesProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  // Load messages from async storage when the provider mounts
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem(MSG_STORAGE_KEY);
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        }
      } catch (error) {
        console.error("error loading messages from store:", error);
      }
    };

    loadMessages();
  }, []);

  // Save messages to AsyncStorage whenever they change
  useEffect(() => {
    const saveMessages = async () => {
      try {
        await AsyncStorage.setItem(MSG_STORAGE_KEY, JSON.stringify(messages));
      } catch (error) {
        console.error("Failed to save messages to store:", error);
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

  return (
    <MessagesContext.Provider value={{ messages, addMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};

// Custom hook to use the MessagesContext
export const useMessages = () => useContext(MessagesContext);
