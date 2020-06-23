import React from "react";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import headerimg from "../assets/header-img.png";

export default function Home({ navigation }) {
  return (
    <ImageBackground source={headerimg} style={styles.bottomTab}>
      <View style={styles.container}>
        <Text>Welcome to RSTRM!</Text> 
        <Text>{`  `}</Text>
        <Text>For when you gotta go...</Text>
        <Text>{`  `}</Text>
        <Button
          title="User Sign/Login"
          onPress={() => navigation.navigate("User")}
        />
        <Button
          title="Account Settings"
          onPress={() => navigation.navigate("Setting")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomTab: {
    color: "white",
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center"
  }
});
