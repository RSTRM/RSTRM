import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import MapView from 'react-native-maps'

export default GoogleMapView = () => {
  return (
    <MapView
      style={styles.mapStyle}
      provider="google"
      initialRegion={{
        latitude: 40.7061,
        longitude: -73.9969,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  )
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 196,
  },
})
