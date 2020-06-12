import React from 'react'
import RestroomView from '../components/RestroomView'
import {StyleSheet, SafeAreaView} from 'react-native'


export default function Map() {
    return (
        <SafeAreaView style={styles.container}>
            <RestroomView />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
})