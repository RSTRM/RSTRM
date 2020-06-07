import React from 'react'
import GoogleMapView from '../components/GoogleMapView'
import {StyleSheet, SafeAreaView} from 'react-native'


export default function Map() {
    return (
        <SafeAreaView style={styles.container}>
            <GoogleMapView />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
})