import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AuthenticationContextType,
  AuthenticationProviderProps,
} from "../types/types";

// AsyncStorage keys
const AUTH_STORAGE_KEY = "@isAuthenticated";
const AUTH_TIME_STORAGE_KEY = "@lastAuthenticatedTime";

// timeout
const TIMEOUT = 3 * 60 * 1000;

// Create the context
const AuthenticationContext = createContext<AuthenticationContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

// Provider component
export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean>(false);

  // Load authentication state and last authenticated time from AsyncStorage when the provider mounts
  useEffect(() => {
    const loadAuthenticationState = async () => {
      try {
        const storedAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        const storedTime = await AsyncStorage.getItem(AUTH_TIME_STORAGE_KEY);

        if (storedAuth === "true" && storedTime) {
          const lastAuthenticatedTime = parseInt(storedTime, 10);
          const currentTime = Date.now();

          // check for timeout
          if (currentTime - lastAuthenticatedTime > TIMEOUT) {
            setIsAuthenticatedState(false);
            await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
            await AsyncStorage.removeItem(AUTH_TIME_STORAGE_KEY);
          } else {
            setIsAuthenticatedState(true);
          }
        }
      } catch (error) {
        console.error("Error loading authentication state:", error);
      }
    };

    loadAuthenticationState();
  }, []);

  // Save authentication state and time to AsyncStorage whenever it changes
  useEffect(() => {
    const saveAuthenticationState = async () => {
      try {
        if (isAuthenticated) {
          await AsyncStorage.setItem(AUTH_STORAGE_KEY, "true");
          await AsyncStorage.setItem(
            AUTH_TIME_STORAGE_KEY,
            Date.now().toString(),
          );
        } else {
          await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
          await AsyncStorage.removeItem(AUTH_TIME_STORAGE_KEY);
        }
      } catch (error) {
        console.error("Error saving authentication state:", error);
      }
    };

    saveAuthenticationState();
  }, [isAuthenticated]);

  // function to update state
  const setIsAuthenticated = (value: boolean) => {
    setIsAuthenticatedState(value);
  };

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

// hook to use the AuthenticationContext
export const useAuthenticationContext = () => useContext(AuthenticationContext);
