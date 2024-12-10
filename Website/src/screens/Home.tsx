import React, { useState, useEffect} from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Modal, TextInput, Alert, Button } from 'react-native';
import { NavigationProps } from '../types/navigation';
import commonStyle, { darkTheme } from '../utils/Style';
import { PASSWORD } from '../../pass';
import { showAlert } from '../utils/Alert';
import Footer from '../components/Footer';

// Home component
const Home: React.FC<NavigationProps<'Home'>> = ({ navigation }) => {

  // force re-authentication after 30 minutes
  const AUTH_TIMEOUT = 30 * 60 * 1000;

  // state variables and setters
  const [isModalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setAuthenticated] = useState(false); 
  const [navigateTarget, setNavigateTarget] = useState<{ route: string; params?: object } | null>(null);
  const [lastAuthenticatedTime, setLastAuthenticatedTime] = useState<number | null>(null);

  // Member data
  const members = [
    { name: 'Joseph', image1: require('../../joseph_headshot.jpeg'), image2: require("../../joseph_pic_2.jpg"), bio: "Joseph is a fourth-year Computer Science and Engineering student with a focus on Machine Learning. He is from Ankeny, Iowa. Joseph currently works at John Deere for their Intelligent Solutions Group focusing on software development and automation. Outside of school, he enjoys playing soccer, basketball, and poker.", email: "jbkrueger@uiowa.edu"},
    { name: 'Holland', image1: require('../../Holland1.jpg'), image2: require("../../Holland1.jpg"), bio: "Holland is a fourth-year Electrical Engineering student with a focus in Power Systems. Upon graduating he intends to pursue work in transmission and distribution planning, substation design and/or protective relay design.", email: "holland-gilmore@uiowa.edu"},
    { name: 'Bri', image1: require('../../BriPic1.jpg'), image2: require("../../BriPic2.jpg"), bio: "Bri is a fourth-year Electrical Engineering student with a focus on sustainability. She grew up in West Liberty, Iowa, a community with a majority Hispanic population. Upon graduation, Bri plans to move out of state to pursue a career in embedded systems and/or energy consumption. She is committed to prioritizing travel, expanding her knowledge, and engaging in outreach efforts to support STEM education in lower-income Hispanic communities.", email: "brianna-villarreal@uiowa.edu"},
    { name: 'Cavan', image1: require('../../cavan_profile_image.png'), image2: require("../../cavan_profile_image.png"), bio: "To be determined.", email: "cavan-riley@uiowa.edu" },
  ];

  // Project data
  const projects = [
    { name: 'Smart Thermostat', image1: require('../../SmartThermostat.jpg'), image2: require('../../SmartThermostat2.jpg'), reportFile: '/assets/Lab1SmartThermostat.pdf', description: 'Our Smart Thermostat project utilized an ESP32 Microcontroller to control an internet-connected thermostat module. It also allowed for remote connection over Wi-Fi for real-time temperature monitoring.'},
    { name: 'ESP Digital Filter', image1: require('../../SmartThermostat.jpg'), image2: require('../../SmartThermostat2.jpg'), reportFile: '/assets/Lab2DigitalFilter.pdf', description: 'Our ESP Digital Filter project utilized an ESP32 Microcontroller and custom circuitry to implement a digital filter.'},
  ]

  // check if user is authenticated or not
  // route is string and params is a dictionary of data for the page (member vs project)
  const handleNavigationRequest = (route: string, params:  {[key: string]: string | number }) => {
    if (isAuthenticated) {

      // only allow navigation if user is authenticated
      navigation.navigate(route, params);
    } else {

      // if not authenticated show the sign in box
      setNavigateTarget({ route, params });
      setModalVisible(true);
    }
  };

  // check if credentials match on sign in 
  const handleSignIn = () => {
    if (password === PASSWORD) {

      // Mark as authenticated if match
      setAuthenticated(true); 
      if (navigateTarget) {

        // switch pages if user was trying to navigate
        navigation.navigate(navigateTarget.route, navigateTarget.params);
      }

      // Update the last authenticated time
      setLastAuthenticatedTime(Date.now()); 
      setModalVisible(false);
      setPassword('');
      setNavigateTarget(null);
    } else {
      showAlert('Incorrect Password', 'Please try again.',);
    }
  };

  // check if authentication has expired
  const isAuthExpired = (): boolean => {

    // return true if no timeout, false otherwise
    return (!lastAuthenticatedTime) || (Date.now() - lastAuthenticatedTime > AUTH_TIMEOUT);
  };

  // Request sign in if authentication has expired
  useEffect(function checkAuthExpiration() {
    if (isAuthenticated && isAuthExpired()) {
      setAuthenticated(false);
      showAlert('Session Expired', 'Please sign in again.');
    }
  }, [isAuthenticated]);

  // Render the Home page
  return (
      <ScrollView 
        style={{ backgroundColor: darkTheme.backgroundBlack }} 
        contentContainerStyle={commonStyle.container}
      >
        <Text style={[commonStyle.header, { color: darkTheme.accentYellow }]}>ECE Team 15: GymHawks</Text>
        <Text style={[commonStyle.sectionTitle, { color: darkTheme.accentYellow }]}>Members</Text>
        <View style={commonStyle.row}>
          {members.map((member, index) => (
            <View key={index} style={commonStyle.memberContainer}>
              <Image source={member.image1} style={commonStyle.memberImage} />
              <TouchableOpacity
                style={[commonStyle.memberButton, { backgroundColor: darkTheme.cardBlack }]}
                onPress={() => handleNavigationRequest('MemberPage', { name: member.name, image: member.image2, bio: member.bio, email: member.email })}
              >
                <Text style={[commonStyle.nameText, { color: darkTheme.textWhite }]}>{member.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Text style={[commonStyle.sectionTitle, { color: darkTheme.accentYellow }]}>Projects</Text>
        <View style={commonStyle.row}>
          {projects.map((project, index) => (
            <View key={index} style={commonStyle.memberContainer}>
              <Image source={project.image1} style={commonStyle.projectImage} />
              <TouchableOpacity
                style={[commonStyle.projectButton, { backgroundColor: darkTheme.cardBlack }]}
                onPress={() => handleNavigationRequest('ProjectPage', { name: project.name, reportFile: project.reportFile, image: project.image2, description: project.description })}
              >
                <Text style={[commonStyle.nameText , { color: darkTheme.textWhite }]}>{project.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Modal for sign in component */}
        <Modal visible={isModalVisible} transparent={true} animationType="fade">
          <View style={commonStyle.modalContainer}>
            <View style={commonStyle.modalContent}>
              <Text style={[commonStyle.modalTitle, { color: darkTheme.accentYellow }]}>Enter Password</Text>
              <TextInput
                style={[
                  commonStyle.input,
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
              <View style={commonStyle.modalButtons}>
                <Button title="Submit" color={darkTheme.accentYellow} onPress={handleSignIn} />
                <Button title="Cancel" color={darkTheme.accentGray} onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>
        <Footer />
      </ScrollView>
  );
};

export default Home;
