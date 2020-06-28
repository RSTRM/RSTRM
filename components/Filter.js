import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Switch, Button } from "react-native";
import { acc } from "react-native-reanimated";
import StarRating from "react-native-star-rating";

export default function Filter({
  unisexFn,
  accessibleFn,
  changingFn,
  minimumRatingFn,
  unisexFilter,
  accessibleFilter,
  changingFilter,
  minimumRating,
  backButton,
}) {
  const [unisexEnabled, setUnisexEnabled] = useState(unisexFilter);
  const [accessibleEnabled, setAccessibleEnabled] = useState(accessibleFilter);
  const [changingEnabled, setChangingEnabled] = useState(changingFilter);
  const [minimumStars, setMinimumStars] = useState(minimumRating);

  const toggleUnisex = () => setUnisexEnabled(!unisexEnabled);
  const toggleAccessible = () => setAccessibleEnabled(!accessibleEnabled);
  const toggleChanging = () => setChangingEnabled(!changingEnabled);

  useEffect(() => unisexFn(unisexEnabled), [unisexEnabled]);
  useEffect(() => accessibleFn(accessibleEnabled), [accessibleEnabled]);
  useEffect(() => changingFn(changingEnabled), [changingEnabled]);
  useEffect(() => minimumRatingFn(minimumStars), [minimumStars]);

  return (
    <View style={styles.container}>
      <Button
        style={styles.closeButton}
        title="Close"
        onPress={() => backButton()}
      />
      <View style={styles.switch}>
        <Text>Unisex Restrooms</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={unisexEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onChange={toggleUnisex}
          value={unisexEnabled}
        />
      </View>
      <View style={styles.switch}>
        <Text>Accessible Restrooms</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={accessibleEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onChange={toggleAccessible}
          value={accessibleEnabled}
        />
      </View>
      <View style={styles.switch}>
        <Text>Changing Table Restrooms</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={changingEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onChange={toggleChanging}
          value={changingEnabled}
        />
      </View>
      <View>
        <Text>Minimum Average Rating</Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={minimumStars}
          selectedStar={(rating) => setMinimumStars(rating)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  switch: {
    margin: 3,
  },
  filter: {
    color: "blue",
    fontWeight: "400",
  },
  button: {
    padding: 20,
    borderRadius: 5,
  },
});
