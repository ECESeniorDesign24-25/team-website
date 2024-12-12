import React, { useState } from 'react';
import { View, Text, TextInput, Button, Dimensions } from 'react-native';
import { NavigationProps } from '../types/types';
import { useMessages } from '../contexts/MessagesContext';
import FooterComponent from '../components/FooterComponent';
import commonStyle, { darkTheme } from '../utils/Style';
import { showAlert } from '../utils/Alert';


const SendMessagePage: React.FC<NavigationProps<'SendMessagePage'>> = ({ route, navigation }) => {

  // use the name from memberpage as the to field
  const { name } = route.params;
  const to = name;

  // use this from global context so we can store messages
  const { addMessage } = useMessages();

  // local state for form inputs
  const [from, setFrom] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [status, setStatus] = useState('');

  // status message for form submission
  let statusMessage = null;

  if (status) {
    statusMessage = <Text style={commonStyle.status}>{status}</Text>;
  }

  // on submit click
  const handleSubmit = () => {
    if (!from || !messageBody) {
      setStatus('');
      showAlert('Error', 'Please fill out all fields.');
      return;
    }
    addMessage(to, from, messageBody);
    setFrom('');
    setMessageBody('');
    setStatus('Message added successfully!');
  };

  return (
    <View style={commonStyle.outerContainer}>
      <View style={commonStyle.innerContainer}>
        <Text style={commonStyle.title}>Send a Message</Text>
        
        {/* To */}
        <TextInput
          style={commonStyle.input}
          placeholder="To"
          placeholderTextColor="#888"
          value={to}
          editable={false} // cant change this
        />
        
        {/* From  */}
        <TextInput
          style={commonStyle.input}
          placeholder="From"
          placeholderTextColor="#888"
          value={from}
          onChangeText={setFrom}
        />
        
        {/* Body */}
        <TextInput
          style={commonStyle.textArea}
          placeholder="Message"
          placeholderTextColor="#888"
          multiline
          value={messageBody}
          onChangeText={setMessageBody}
        />
        
        {/* Submit */}
        <View style={commonStyle.buttonContainer}>
          <Button
            title="Send Message"
            color={darkTheme.accentYellow}
            onPress={handleSubmit}
          />
        </View>
        
        {/* status message */}
        {statusMessage}
      </View>
        
      {/* Message History */}
      <View style={commonStyle.buttonContainer}>
        <Button
          title="View Message History"
          color={darkTheme.accentYellow}
          onPress={() => navigation.navigate('MessageHistoryPage')}
        />
      </View>

      <FooterComponent />
    </View>
  );
};

export default SendMessagePage;
