import React from 'react';
import { ScrollView, View, Text, Image, Linking } from 'react-native';
import { NavigationProps } from '../types/navigation';
import commonStyle, { darkTheme } from '../utils/Style';
import SMSComponent from '../components/SMSComponent';
import Footer from '../components/Footer'; 

// MemberPage component
export default function MemberPage({ route }: NavigationProps<'MemberPage'>) {
  // Customized data for each member
  const { name, image, bio, email } = route.params;

  // Handle email link press
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${email}`);
  };

  // Render MemberPage
  return (
    <View style={commonStyle.outerContainer}>
      <ScrollView
        contentContainerStyle={[
          commonStyle.container,
          { backgroundColor: darkTheme.backgroundBlack, paddingBottom: 20 },
        ]}
      >
        {/* Member Information */}
        <View style={commonStyle.content}>
          <Text style={[commonStyle.title, { color: darkTheme.accentYellow }]}>{name}</Text>
          <Image source={image} style={commonStyle.image} />
          <View style={commonStyle.textContainer}>
            <Text style={[commonStyle.text, { color: darkTheme.textWhite }]}>{bio}</Text>
          </View>
        </View>

        {/* Form Section in a Box */}
        <View style={commonStyle.formContainer}>
          <Text style={commonStyle.formTitle}>Send {name} a message</Text>
          <View style={commonStyle.formContent}>
            <SMSComponent
              route={{
                params: {
                  name,
                  email,
                  number: email,
                },
              }}
            />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}