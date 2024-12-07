import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NavigationProps } from '../types/navigation';
import { darkTheme } from '../theme';

const Home: React.FC<NavigationProps<'Home'>> = ({ navigation }) => {
  const members = [
    { name: 'Joseph', image: require('../../assets/joseph_headshot.jpeg') },
    { name: 'Holland', image: require('../../assets/joseph_headshot.jpeg') },
    { name: 'Bri', image: require('../../assets/joseph_headshot.jpeg') },
    { name: 'Cavan', image: require('../../assets/joseph_headshot.jpeg') },
  ];

  const projects = [
    { name: 'Smart Thermostat', image: require('../../assets/joseph_headshot.jpeg') },
    { name: 'ESP Digital Filter', image: require('../../assets/joseph_headshot.jpeg') },
  ];

  return (
    <ScrollView style={{ backgroundColor: darkTheme.background }} contentContainerStyle={styles.container}>
      <Text style={[styles.header, { color: darkTheme.primary }]}>ECE Team 15: GymHawks</Text>
      <Text style={{ color: darkTheme.text, textAlign: 'center', marginBottom: 20 }}>
        Click on a team member to view their profile.
      </Text>
      <Text style={[styles.sectionTitle, { color: darkTheme.primary }]}>Members</Text>
      <View style={styles.row}>
        {members.map((member, index) => (
          <View key={index} style={styles.memberContainer}>
            <Image source={member.image} style={styles.memberImage} />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: darkTheme.card }]}
              onPress={() => navigation.navigate('MemberPage', { name: member.name })}
            >
              <Text style={{ color: darkTheme.text }}>{member.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Text style={[styles.sectionTitle, { color: darkTheme.primary }]}>Projects</Text>
      <Text style={{ color: darkTheme.text, textAlign: 'center', marginBottom: 20 }}>
        Click on a project to view details.
      </Text>
      <View style={styles.row}>
        {projects.map((project, index) => (
          <View key={index} style={styles.memberContainer}>
            <Image source={project.image} style={styles.projectImage} />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: darkTheme.card }]}
              onPress={() => navigation.navigate('ProjectPage', { name: project.name })}
            >
              <Text style={{ color: darkTheme.text }}>{project.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // container style
  container: {
    padding: 20,
    alignItems: 'center', // Center content horizontally
  },

  // header style
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    marginTop: 10,
  },

  // section title style
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  // row style
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap', // Ensures proper wrapping on smaller screens
    width: '100%',
  },

  // team member container style
  memberContainer: {
    alignItems: 'center',
    margin: 20,
  },

  // button style
  button: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    width: 120,
    alignItems: 'center',
  },

  // member image style
  memberImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    padding: 10,
  },

  // project image style
  projectImage: {
    width: 200,
    height: 200,
    borderRadius: 20, // Use a smaller radius for rectangular project images
    padding: 10,
  },
});

export default Home;
