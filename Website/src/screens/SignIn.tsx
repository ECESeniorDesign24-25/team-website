import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationProps } from '../types/navigation';
import { darkTheme } from '../theme';

export default function SignIn({ navigation }: NavigationProps<'SignIn'>) {
  const [password, setPassword] = useState('');

  // check if credentials match TODO: Need to use environment variable
  const handleSignIn = () => {
    if (password === 'password') {
      navigation.navigate('Home');
    } else {
      alert('Invalid credentials.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: darkTheme.backgroundBlack }]}>
      <View style={[styles.form, { backgroundColor: darkTheme.cardBlack }]}>
        <Text style={[styles.title, { color: darkTheme.accentYellow }]}>Sign In</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: darkTheme.cardBlack,
              color: darkTheme.textWhite,
              borderColor: darkTheme.accentYellow,
            },
          ]}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Sign In" color={darkTheme.accentYellow} onPress={handleSignIn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  form: {
    width: '50%',
    maxWidth: 400,
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
});
