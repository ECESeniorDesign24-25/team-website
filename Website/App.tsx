import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import MemberPage from './src/screens/MemberPage';
import ProjectPage from './src/screens/ProjectPage';
import * as Font from 'expo-font';
import { Text, View } from 'react-native';


// stack navigator parameters
export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  MemberPage: { name: string, image: any, bio: string, email: string };
  ProjectPage: { name: string, reportFile: string };
};

// stack navigator object for app screens
const StackNavigator = createStackNavigator<RootStackParamList>();

// main app component
export default function App() {

  // load Uiowa fonts: https://brand.uiowa.edu/fonts 
  useEffect(function loadFontsEffect() {
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

  // render the app screens
  return (
    <NavigationContainer>
      <StackNavigator.Navigator
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#FFCD00',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
          }}>
        <StackNavigator.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <StackNavigator.Screen name="MemberPage" component={MemberPage} options={{headerShown: true}} />
        <StackNavigator.Screen name="ProjectPage" component={ProjectPage} options={{headerShown: true}}/>
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}
