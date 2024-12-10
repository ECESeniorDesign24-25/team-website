import React from 'react';
import { View, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import commonStyle, {darkTheme} from '../utils/Style'; 


const Footer: React.FC = () => {
  return (
    <View style={commonStyle.footer}>
      <Text style={[commonStyle.footerText, { color: darkTheme.textWhite, paddingTop: 40}]}>
        GymHawks. The University of Iowa, College of Engineering, Electrical and Computer Engineering (2024).
      </Text>
    </View>
  );
};

export default Footer;
