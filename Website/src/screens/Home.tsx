import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NavigationProps } from '../types/navigation';
import { darkTheme } from '../theme';

const Home: React.FC<NavigationProps<'Home'>> = ({ navigation }) => {
  const members = [
    { name: 'Joseph', image: require('../../assets/joseph_headshot.jpeg'), bio: "To be determined.", email: "jbkrueger@uiowa.edu"},
    { name: 'Holland', image: require('../../assets/joseph_headshot.jpeg'), bio: "To be determined.", email: "holland-gilmore@uiowa.edu"},
    { name: 'Bri', image: require('../../assets/joseph_headshot.jpeg'), bio: "Bri is a fourth-year Electrical Engineering student with a focus on sustainability. She grew up in West Liberty, Iowa, a community with a majority Hispanic population. Upon graduation, Bri plans to move out of state to pursue a career in embedded systems and/or energy consumption. She is committed to prioritizing travel, expanding her knowledge, and engaging in outreach efforts to support STEM education in lower-income Hispanic communities.", email: "brianna-villarreal@uiowa.edu"},
    { name: 'Cavan', image: require('../../assets/joseph_headshot.jpeg'), bio: "To be determined.", email: "cavan-riley@uiowa.edu" },
  ];

  const projects = [
    { name: 'Smart Thermostat', image: require('../../assets/joseph_headshot.jpeg'), reportFile: '/assets/Lab1SmartThermostat.pdf'},
    { name: 'ESP Digital Filter', image: require('../../assets/joseph_headshot.jpeg'), reportFile: '/assets/Lab2DigitalFilter.pdf'},
  ];

  return (
    <ScrollView 
      style={{ backgroundColor: darkTheme.backgroundBlack }} 
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.header, { color: darkTheme.accentYellow }]}>ECE Team 15: GymHawks</Text>
      <Text style={[styles.sectionTitle, { color: darkTheme.accentYellow }]}>Members</Text>
      <View style={styles.row}>
        {members.map((member, index) => (
          <View key={index} style={styles.memberContainer}>
            <Image source={member.image} style={styles.memberImage} />
            <TouchableOpacity
              style={[styles.memberButton, { backgroundColor: darkTheme.cardBlack }]}
              onPress={() => navigation.navigate('MemberPage', { name: member.name, image: member.image, bio: member.bio, email: member.email })}
            >
              <Text style={{ color: darkTheme.textWhite }}>{member.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Text style={[styles.sectionTitle, { color: darkTheme.accentYellow }]}>Projects</Text>
      <View style={styles.row}>
        {projects.map((project, index) => (
          <View key={index} style={styles.memberContainer}>
            <Image source={project.image} style={styles.projectImage} />
            <TouchableOpacity
              style={[styles.projectButton, { backgroundColor: darkTheme.cardBlack }]}
              onPress={() => navigation.navigate('ProjectPage', { name: project.name, reportFile: project.reportFile })}
            >
              <Text style={{ color: darkTheme.textWhite }}>{project.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
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
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
});

export default Home;
