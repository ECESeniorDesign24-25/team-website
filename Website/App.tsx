import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/screens/HomePage';
import MemberPage from './src/screens/MemberPage';
import ProjectPage from './src/screens/ProjectPage';
import MessageHistoryPage from './src/screens/MessageHistoryPage';
import SendMessagePage from './src/screens/SendMessagePage';
import * as Font from 'expo-font';
import { MessagesProvider } from './src/contexts/MessagesContext';

export type RootStackParamList = {
  HomePage: undefined;
  MemberPage: { name: string; image: any; bio: string; email: string; number: string };
  ProjectPage: { name: string; reportFile: string; image?: any; description?: string };
  MessageHistoryPage: undefined;
  SendMessagePage: undefined; 
};

const StackNavigator = createStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Roboto-bold': require('./fonts/RobotoCondensed-Bold.ttf'),
        'Roboto-regular': require('./fonts/RobotoCondensed-Regular.ttf'),
        'Roboto-light': require('./fonts/RobotoCondensed-Light.ttf'),
        'Antonio-bold': require('./fonts/Antonio-Bold.ttf'),
        'Antonio-regular': require('./fonts/Antonio-Regular.ttf'),
        'Antonio-light': require('./fonts/Antonio-Light.ttf'),
      });
    }
    loadFonts();
  }, []);

  return (
    <MessagesProvider> {/* WRAP HERE */}
      <NavigationContainer>
        <StackNavigator.Navigator
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#FFCD00',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <StackNavigator.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
          <StackNavigator.Screen name="MemberPage" component={MemberPage} options={{ headerShown: true }} />
          <StackNavigator.Screen name="ProjectPage" component={ProjectPage} options={{ headerShown: true }} />
          <StackNavigator.Screen name="MessageHistoryPage" component={MessageHistoryPage} options={{ title: 'Message History' }}/>
          <StackNavigator.Screen name="SendMessagePage" component={require('./src/screens/SendMessagePage').default} options={{ title: 'Send Message' }}/>
        </StackNavigator.Navigator>
      </NavigationContainer>
    </MessagesProvider>
  );
}
