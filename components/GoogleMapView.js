import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Circle } from "react-native-maps";
import Markers from './Markers'
import * as Location from "expo-location";

export default GoogleMapView = () => {
  const [region, setRegion] = useState({
    latitude: 40.7061,
    longitude: -73.9969,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  });

  const onRegionChangeComplete = (region) => {
    setRegion(region);
  };

  if (!location || !region) {
    return (
      <View style={styles.permissions}>
        <Text style={styles.text}>{errorMsg}</Text>
      </View>
    )
  }
  return (
    <MapView
      style={styles.mapStyle}
      provider="google"
      initialRegion={region}
      showsUserLocation={true}
      onRegionChangeComplete={onRegionChangeComplete}
    >
      <Markers/>
      <Circle center={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
        }} 
        radius={500} 
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  permissions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: "red"
  }
});
