import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import GoogleMapView from './components/GoogleMapView'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to RSTRM! For when you gotta go...</Text>
      <GoogleMapView />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})
