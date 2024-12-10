import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NavigationProps } from '../types/navigation';
import commonStyle, { darkTheme } from '../utils/Style';

// SMS component
const SMSComponent: React.FC<NavigationProps<'SendMessageForm'>> = ({ route }) => {
    
  // Custom member params
  const { name, email, number } = route.params;

  // State variables for form inputs
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');

  // Handle send message logic TODO
  const handleSendMessage = () => {};

  return (
    <View style={commonStyle.container}>

      {/* Form Layout */}
      <View style={commonStyle.formRow}>

        {/* Left Column */}
        <View style={commonStyle.leftColumn}>
          <TextInput
            style={commonStyle.formInput}
            placeholder="Your Name"
            placeholderTextColor="#888"
            value={userName}
            onChangeText={setUserName}
          />
          <TextInput
            style={commonStyle.formInput}
            placeholder="Your Phone Number"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            value={userPhoneNumber}
            onChangeText={setUserPhoneNumber}
          />
        </View>

        {/* Right Column */}
        <View style={commonStyle.rightColumn}>
          <TextInput
            style={commonStyle.textArea}
            placeholder="Your Message"
            placeholderTextColor="#888"
            multiline
            value={message}
            onChangeText={setMessage}
          />
        </View>
      </View>

      {/* Button */}
      <View style={commonStyle.formButtonContainer}>
        <Button
          title="Send Message"
          color={darkTheme.accentYellow}
          onPress={handleSendMessage}
        />
      </View>
    </View>
  );
};

export default SMSComponent;
