import { Alert, Platform } from "react-native";

// Show an alert with a title and message (different for iOS/Android/web)
export const showAlert = (title: string, message: string): void => {
  if (Platform.OS === "web") {
    window.alert(`${title}\n${message}`);
  } else {
    Alert.alert(title, message, [
      { text: "OK", onPress: () => console.log(`${title}: Alert dismissed.`) },
    ]);
  }
};
