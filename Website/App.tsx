import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import MemberPage from './src/screens/MemberPage';
import ProjectPage from './src/screens/ProjectPage';
import * as Font from 'expo-font';
import { Text, View } from 'react-native';


export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  MemberPage: { name: string, image: any, bio: string, email: string };
  ProjectPage: { name: string, reportFile: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Roboto-bold': require('./assets/fonts/RobotoCondensed-Bold.ttf'),
        'Roboto-regular': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
        'Roboto-light': require('./assets/fonts/RobotoCondensed-Light.ttf'),
        'Antonio-bold': require('./assets/fonts/Antonio-Bold.ttf'),
        'Antonio-regular': require('./assets/fonts/Antonio-Regular.ttf'),
        'Antonio-light': require('./assets/fonts/Antonio-Light.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#FFCD00',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
          }}>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="MemberPage" component={MemberPage} options={{headerShown: true}} />
        <Stack.Screen name="ProjectPage" component={ProjectPage} options={{headerShown: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
