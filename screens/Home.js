import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'


export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Welcome to RSTRM!</Text>
            <Text>For when you gotta go...</Text>
            <Button title="User Sign/Login"
                onPress={() => navigation.navigate('User')}
            />
            <Button title="Account Settings"
                onPress={() => navigation.navigate('Setting')}
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

