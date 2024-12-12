import React, { useState, useEffect} from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, Modal, TextInput, Alert, Button } from 'react-native';
import { NavigationProps } from '../types/navigation';
import { darkTheme } from '../theme';
import { PASSWORD } from '../../pass';

const Home: React.FC<NavigationProps<'Home'>> = ({ navigation }) => {

  // Time until authentication expires: 30 minutes
  const AUTH_TIMEOUT = 0.5 * 60 * 1000; 

  // Tracks sign in popup visibility
  const [isModalVisible, setModalVisible] = useState(false);

  // Tracks password input
  const [password, setPassword] = useState('');

  // Tracks authentication status
  const [isAuthenticated, setAuthenticated] = useState(false); 

  // Tracks page target
  const [navigateTarget, setNavigateTarget] = useState<{ route: string; params?: object } | null>(null);

  // Tracks last time authenticated
  const [lastAuthenticatedTime, setLastAuthenticatedTime] = useState<number | null>(null);

  // Member data for page
  const members = [
    { name: 'Joseph', image1: require('../../joseph_headshot.jpeg'), image2: require("../../joseph_pic_2.jpg"), bio: "Joseph is a fourth-year Computer Science and Engineering student with a focus on Machine Learning. He is from Ankeny, Iowa. Joseph currently works at John Deere for their Intelligent Solutions Group focusing on software development and automation. Outside of school, he enjoys playing soccer, basketball, and poker.", email: "jbkrueger@uiowa.edu"},
    { name: 'Holland', image1: require('../../Holland1.jpg'), image2: require("../../Holland1.jpg"), bio: "Holland is a fourth-year Electrical Engineering student with a focus in Power Systems. Upon graduating he intends to pursue work in transmission and distribution planning, substation design and/or protective relay design.", email: "holland-gilmore@uiowa.edu"},
    { name: 'Bri', image1: require('../../BriPic1.jpg'), image2: require("../../BriPic2.jpg"), bio: "Bri is a fourth-year Electrical Engineering student with a focus on sustainability. She grew up in West Liberty, Iowa, a community with a majority Hispanic population. Upon graduation, Bri plans to move out of state to pursue a career in embedded systems and/or energy consumption. She is committed to prioritizing travel, expanding her knowledge, and engaging in outreach efforts to support STEM education in lower-income Hispanic communities.", email: "brianna-villarreal@uiowa.edu"},
    { name: 'Cavan', image1: require('../../cavan_profile_image.png'), image2: require("../../cavan_profile_image.png"), bio: "Cavan is a fourth-year Computer Science and Engineering student with a focus on Software Development. He is from Cedar Rapids, Iowa and is currently an undergraduate research assistant in the SINAPSE lab in the College of Engineering. His research involves leveraging advanced deep learning techniques to analyze medical imaging, aiming to improve diagnostic precision and patient outcomes.", email: "cavan-riley@uiowa.edu" },
  ];

  // Project data for page
  const projects = [
    { name: 'Smart Thermostat', image1: require('../../SmartThermostat.jpg'), image2: require('../../SmartThermostat2.jpg'), reportFile: require('../../Lab1SmartThermostat.pdf'), description: 'Our Smart Thermostat project utilized an ESP32 Microcontroller to control an internet-connected thermostat module. It also allowed for remote connection over Wi-Fi for real-time temperature monitoring.'},
    { name: 'ESP Digital Filter', image1: require('../../Lab2b.png'), image2: require('../../Lab2.jpg'), reportFile: require('../../Lab2DigitalFilter.pdf'), description: 'Our ESP Digital Filter project utilized an ESP32 Microcontroller and custom circuitry to implement a digital filter.'},
  ]

  // check if user is authenticated or not
  const handleNavigationRequest = (route: string, params?: object) => {
    if (isAuthenticated) {
      navigation.navigate(route, params);
    } else {
      setNavigateTarget({ route, params });
      setModalVisible(true);
    }
  };

  // check if credentials match on sign in 
  const handleSignIn = () => {
    if (password === PASSWORD) {
      setAuthenticated(true); // Mark as authenticated
      if (navigateTarget) {
        navigation.navigate(navigateTarget.route, navigateTarget.params);
      }
      setLastAuthenticatedTime(Date.now()); // Update the last authenticated time
      setModalVisible(false);
      setPassword('');
      setNavigateTarget(null);
    } else {
      Alert.alert('Invalid Password', 'Please try again.');
    }
  };

  // check if authentication has expired
  const isAuthExpired = (): boolean => {
    // display difference in time
    if (lastAuthenticatedTime){
      console.log(Date.now() - lastAuthenticatedTime);
    }
    else {
      console.log("lastAuthenticatedTime is null");
    }

    if (!lastAuthenticatedTime) return true;
    return Date.now() - lastAuthenticatedTime > AUTH_TIMEOUT;
  };

  // Request sign in if authentication has expired
  useEffect(() => {
    if (isAuthenticated && isAuthExpired()) {
      setAuthenticated(false);
      Alert.alert('Session Expired', 'Your session has expired. Please sign in.');
    }
  }, [isAuthenticated]);

  // Render the Home page
  return (
    <>
      <ScrollView 
        style={{ backgroundColor: darkTheme.backgroundBlack }} 
        contentContainerStyle={styles.container}
      >
        <Text style={[styles.header, { color: darkTheme.accentYellow }]}>ECE Team 15: GymHawks</Text>
        <Text style={[styles.sectionTitle, { color: darkTheme.accentYellow }]}>Members</Text>
        <View style={styles.row}>
          {members.map((member, index) => (
            <View key={index} style={styles.memberContainer}>
              <Image source={member.image1} style={styles.memberImage} />
              <TouchableOpacity
                style={[styles.memberButton, { backgroundColor: darkTheme.cardBlack }]}
                onPress={() => handleNavigationRequest('MemberPage', { name: member.name, image: member.image2, bio: member.bio, email: member.email })}
              >
                <Text style={[styles.nameText, { color: darkTheme.textWhite }]}>{member.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Text style={[styles.sectionTitle, { color: darkTheme.accentYellow }]}>Projects</Text>
        <View style={styles.row}>
          {projects.map((project, index) => (
            <View key={index} style={styles.memberContainer}>
              <Image source={project.image1} style={styles.projectImage} />
              <TouchableOpacity
                style={[styles.projectButton, { backgroundColor: darkTheme.cardBlack }]}
                onPress={() => handleNavigationRequest('ProjectPage', { name: project.name, reportFile: project.reportFile, image: project.image2, description: project.description })}
              >
                <Text style={[styles.nameText , { color: darkTheme.textWhite }]}>{project.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal for Password Input */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalTitle, { color: darkTheme.accentYellow }]}>Enter Password</Text>
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
            <View style={styles.modalButtons}>
              <Button title="Submit" color={darkTheme.accentYellow} onPress={handleSignIn} />
              <Button title="Cancel" color={darkTheme.accentGray} onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center', 
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Antonio-bold',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Antonio-regular',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
  },
  memberContainer: {
    alignItems: 'center',
    margin: 20,
  },
  memberButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    width: 120,
    alignItems: 'center',
  },
  projectButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    width: 200,
    alignItems: 'center',
  },
  memberImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    padding: 10,
  },
  projectImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: darkTheme.cardBlack,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Antonio-bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nameText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto-regular',
  },
});

export default Home;
