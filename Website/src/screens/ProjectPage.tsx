import React, { useState } from "react";
import { View, Text, Button, Platform, Image } from "react-native";
import { NavigationProps } from "../types/types";
import commonStyle, { darkTheme } from "../utils/Style";
import FooterComponent from "../components/FooterComponent";
import { showAlert } from "../utils/Alert";

// ProjectPage component
export default function ProjectPage({ route }: NavigationProps<"ProjectPage">) {
  // Customized data for each project
  const { name, reportFile, image, description } = route.params;
  const [downloading, setDownloading] = useState(false);

  // Download the PDF
  const downloadReport = () => {
    if (Platform.OS === "web") {
      setDownloading(true);
      const link = document.createElement("a");
      link.href = reportFile;
      link.download = `${name}_report.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloading(false);
    } else {
      showAlert("Not Supported", "Downloading is only supported on the web.");
    }
  };

  // Render ProjectPage
  return (
    <View style={commonStyle.outerContainer}>
      <View style={commonStyle.innerContainer}>
        <Text style={[commonStyle.title, { color: darkTheme.accentYellow }]}>
          {name}
        </Text>
        <Image source={image} style={commonStyle.image} resizeMode="cover" />
        <Text style={[commonStyle.text, { color: darkTheme.textWhite }]}>
          {description}
        </Text>
        <View style={commonStyle.formButtonContainer}>
          <Button
            title={downloading ? "Downloading..." : "Download Report"}
            onPress={downloadReport}
            color={darkTheme.accentYellow}
            disabled={downloading}
          />
        </View>
      </View>
      <FooterComponent />
    </View>
  );
}
