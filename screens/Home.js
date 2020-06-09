import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'


export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Welcome to RSTRM!</Text>
            <Text>For when you gotta go...</Text>
            <Button title="Go to Map"
                onPress={() => navigation.navigate('Map')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
})