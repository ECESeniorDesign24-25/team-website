import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, Platform } from 'react-native';
import { NavigationProps } from '../types/navigation';
import { darkTheme } from '../theme';

export default function ProjectPage({ route }: NavigationProps<'ProjectPage'>) {
  const { name, reportFile } = route.params;
  const [downloading, setDownloading] = useState(false);

  const downloadReport = () => {
    if (Platform.OS === 'web') {
      setDownloading(true);
      const link = document.createElement('a');
      link.href = reportFile;
      link.download = `${name}_report.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloading(false);
      Alert.alert('Download Initiated', 'Your download should start shortly.');
    } else {
      Alert.alert('Not Supported', 'Downloading is only supported on the web.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: darkTheme.backgroundBlack }]}>
      <Text style={[styles.title, { color: darkTheme.accentYellow }]}>{name}</Text>
      <Text style={[styles.text, { color: darkTheme.textWhite }]}>
        This is where {name}'s details will go.
      </Text>
      <View style={styles.downloadContainer}>
        <Button
          title={downloading ? 'Downloading...' : 'Download Report'}
          onPress={downloadReport}
          color={darkTheme.accentYellow}
          disabled={downloading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    textAlign: 'center',
    fontFamily: 'Antonio-bold',
  },
  text: { 
    fontSize: 16, 
    textAlign: 'center', 
    marginBottom: 40, 
    color: '#FFF',
    fontFamily: 'Roboto-regular',
  },
  downloadContainer: {
    alignSelf: 'center',
    width: '60%',
  },
});
