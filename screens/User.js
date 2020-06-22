import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function User({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Sign up" />
      <Button title="Log in" onPress={() => navigation.navigate("AuthForm")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
