import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Navigation parameters for the app
export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  MemberPage: { name: string };
  SendMessageForm: { name: string; email: string; number: string };
};

// Navigation props for the app
export type NavigationProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

// SMS component props
export interface SMSProps {
  route: RouteProp<{ params: { name: string; email: string; number: string } }, 'params'>;
}