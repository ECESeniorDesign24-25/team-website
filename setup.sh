#!/bin/bash -e

cd Website
npm install @react-navigation/native react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
npm install @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-fs
npx expo install react-native-web @expo/metro-runtime
