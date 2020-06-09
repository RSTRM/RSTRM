import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import seedArray from "../assets/initialSeed";
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
      {seedArray.map((marker, i) => (
        <Marker 
          key={i}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.name}
          description={`Go: ${marker.directions}\nTip: ${marker.comment}`}

        />
      ))}
      <Circle center={region} radius={500} />
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
