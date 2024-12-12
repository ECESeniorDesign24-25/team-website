import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReactNode } from 'react';

// Navigation parameters for the app
export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  MemberPage: { name: string };
  SendMessageForm: { name: string; email: string; number: string };
};

// Navigation props for the app
export type NavigationProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

//////////////////////////////////////// Authentication ////////////////////////////////////////
// Authentication interface
export type Authentication = {
    isAuthenticated: boolean;
    lastAuthenticatedTime?: number;
}

// Authentication provider parameters
export type AuthenticationProviderProps = {
  children: ReactNode;
}

//////////////////////////////////////// Messaging ////////////////////////////////////////
// Message interface
export type Message = {
  uuid: string;
  to: string;
  from: string;
  messageBody: string;
  timestamp: number;
}

// parameters for the provider
interface MessagesProviderProps {
  children: ReactNode;
}