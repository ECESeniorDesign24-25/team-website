import React from 'react';
import { ScrollView, View, Text, Image, Button } from 'react-native';
import { NavigationProps } from '../types/types';
import commonStyle, { darkTheme } from '../utils/Style';
import FooterComponent from '../components/FooterComponent';

// MemberPage component
export default function MemberPage({ route, navigation }: NavigationProps<'MemberPage'>) {
  
  // member data
  const { name, image, bio } = route.params;

  // render page
  return (
    <View style={commonStyle.outerContainer}>
      <ScrollView
        contentContainerStyle={[
          commonStyle.container,
          { backgroundColor: darkTheme.backgroundBlack, paddingBottom: 20 },
        ]}
      >
        <View style={commonStyle.content}>
          {/* Name */}
          <Text style={[commonStyle.title, { color: darkTheme.accentYellow }]}>{name}</Text>

          {/* Image */}
          <Image source={image} style={commonStyle.image} />

          {/* Bio */}
          <View style={commonStyle.textContainer}>
            <Text style={[commonStyle.text, { color: darkTheme.textWhite }]}>{bio}</Text>
          </View>
        </View>

        <View style={commonStyle.formContainer}>
          <Text style={commonStyle.formTitle}>Messaging Options</Text>

          {/* Send Message */}
          <View style={commonStyle.formButtonContainer}>
            <Button
              title="Send a Message"
              color={darkTheme.accentYellow}
              onPress={() => navigation.navigate('SendMessagePage', { name: name })}
            />
          </View>

          {/* Message History */}
          <View style={commonStyle.formButtonContainer}>
            <Button
              title="View Message History"
              color={darkTheme.accentYellow}
              onPress={() => navigation.navigate('MessageHistoryPage')}
            />
          </View>
        </View>

        <FooterComponent />
      </ScrollView>
    </View>
  );
}
