import React from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { NavigationProps } from '../types/navigation';
import { darkTheme } from '../theme';
import commonStyle  from '../common_style';

export default function MemberPage({ route }: NavigationProps<'MemberPage'>) {
  const { name, image, bio, email } = route.params;

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <View style={[commonStyle.container, { backgroundColor: darkTheme.backgroundBlack }]}>
      <View style={commonStyle.content}>
        <Text style={[commonStyle.title, { color: darkTheme.accentYellow }]}>{name}</Text>
        <Image source={image} style={commonStyle.image} />
        <View style={commonStyle.textContainer}>
          <Text style={[commonStyle.text, { color: darkTheme.textWhite }]}>{bio}</Text>
        </View>
      </View>

      <View style={commonStyle.footer}>
        <Text style={[commonStyle.footerText, { color: darkTheme.textWhite }]}>
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