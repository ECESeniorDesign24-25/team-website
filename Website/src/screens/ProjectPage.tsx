import React, { useState } from 'react';
import { View, Text, Button, Alert, Platform, Image } from 'react-native';
import { NavigationProps } from '../types/navigation';
import commonStyle, { darkTheme } from '../utils/Style';
import FooterComponent from '../components/FooterComponent';

// ProjectPage component
export default function ProjectPage({ route }: NavigationProps<'ProjectPage'>) {
  
  // customized data for each project
  const { name, reportFile, image, description } = route.params;
  const [downloading, setDownloading] = useState(false);

  // download the pdf
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

  // render ProjectPage
  return (
    <View style={[commonStyle.container, { backgroundColor: darkTheme.backgroundBlack }]}>
      <Text style={[commonStyle.title, { color: darkTheme.accentYellow }]}>{name}</Text>
      <Image source={image} style={commonStyle.image} resizeMode="cover" />
      <Text style={[commonStyle.text, { color: darkTheme.textWhite }]}>{description}</Text>
      <View style={commonStyle.downloadContainer}>
        <Button
          title={downloading ? 'Downloading...' : 'Download Report'}
          onPress={downloadReport}
          color={darkTheme.accentYellow}
          disabled={downloading}
        />
      </View>
      <FooterComponent />
    </View>
  );
}