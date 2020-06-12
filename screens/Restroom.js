import React from 'react'
import RestroomView from '../components/RestroomView'
import {StyleSheet, SafeAreaView} from 'react-native'


export default function Map() {
    return (
        <View style={styles.container}>
            <RestroomView />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
})