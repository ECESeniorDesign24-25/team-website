import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './src/screens/SignIn';
import Home from './src/screens/Home';
import MemberPage from './src/screens/MemberPage';
import ProjectPage from './src/screens/ProjectPage';

export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  MemberPage: { name: string, image: any, bio: string, email: string };
  ProjectPage: { name: string, reportFile: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#FFD700',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
          }}>
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="MemberPage" component={MemberPage} />
        <Stack.Screen name="ProjectPage" component={ProjectPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
