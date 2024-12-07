import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationProps } from '../types/navigation';
import { darkTheme } from '../theme';

export default function SignIn({ navigation }: NavigationProps<'SignIn'>) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // check if credentials match
  const handleSignIn = () => {
    if (username === 'admin' && password === 'password') {
      navigation.navigate('Home');
    } else {
      alert('Invalid credentials.');
    }
  };

  // return the sign-in form
  return (
    <View style={[styles.container, { backgroundColor: darkTheme.background }]}>
      <View style={styles.form}>
        <Text style={[styles.title, { color: darkTheme.primary }]}>Sign In</Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: darkTheme.card, color: darkTheme.text, borderColor: darkTheme.primary },
          ]}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={[
            styles.input,
            { backgroundColor: darkTheme.card, color: darkTheme.text, borderColor: darkTheme.primary },
          ]}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Sign In" color={darkTheme.primary} onPress={handleSignIn} />
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
    backgroundColor: darkTheme.card,
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
    borderWidth: 1
  },
});
