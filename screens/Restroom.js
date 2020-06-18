import React from "react";
import BathroomView from "../components/BathroomView";
import { StyleSheet, View } from "react-native";

export default function Restroom() {
  return (
    <View style={styles.container}>
      <BathroomView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
