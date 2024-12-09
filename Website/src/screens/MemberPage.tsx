import React from 'react';
import { View, Text, Image, StyleSheet, Linking } from 'react-native';
import { NavigationProps } from '../types/navigation';
import { darkTheme } from '../theme';

export default function MemberPage({ route }: NavigationProps<'MemberPage'>) {
  const { name, image, bio, email } = route.params;

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: darkTheme.backgroundBlack }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: darkTheme.accentYellow }]}>{name}</Text>
        <Image source={image} style={styles.memberImage} />
        <View style={styles.textContainer}>
          <Text style={[styles.text, { color: darkTheme.textWhite }]}>{bio}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: darkTheme.textWhite }]}>
          The University of Iowa, College of Engineering (2024). Contact: 
          {' '}
          <Text
            style={{ textDecorationLine: 'underline', color: darkTheme.textWhite }}
            onPress={handleEmailPress}
          >
            {email}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    textAlign: 'center',
    fontFamily: 'Antonio-bold',
  },
  memberImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  textContainer: {
    width: '50%',    
    padding: 20,     
  },
  text: { 
    fontSize: 16, 
    textAlign: 'center', 
    fontWeight: 'bold',
    fontFamily: 'Roboto-regular',
  },
  footer: {
    marginBottom: 20, 
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Roboto-light',
  },
});
