import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage key
const AUTH_STORAGE_KEY = '@isAuthenticated';

// Define the context type
interface AuthenticationContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

// Create the context
const AuthenticationContext = createContext<AuthenticationContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

interface AuthenticationProviderProps {
  children: ReactNode;
}

// Provider component
export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean>(false);

  // Load authentication state from AsyncStorage when the provider mounts
  useEffect(() => {
    const loadAuthenticationState = async () => {
      try {
        const storedAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (storedAuth !== null) {
          setIsAuthenticatedState(storedAuth === 'true');
        }
      } catch (error) {
        console.error('Error loading authentication state:', error);
      }
    };

    loadAuthenticationState();
  }, []);

  // Save authentication state to AsyncStorage whenever it changes
  useEffect(() => {
    const saveAuthenticationState = async () => {
      try {
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(isAuthenticated));
      } catch (error) {
        console.error('Error saving authentication state:', error);
      }
    };

    saveAuthenticationState();
  }, [isAuthenticated]);

  // Custom setter function to update the state
  const setIsAuthenticated = (value: boolean) => {
    setIsAuthenticatedState(value);
  };

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

// Custom hook to use the AuthenticationContext
export const useAuthenticationContext = () => useContext(AuthenticationContext);
