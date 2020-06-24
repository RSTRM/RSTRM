import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'


export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 28, marginBottom: 10}}>Welcome to RSTRM!</Text>
      <Text style={{fontSize: 18, marginBottom: 10}}>For when you gotta go ...</Text>
      <Button
        title="User Sign/Login"
        onPress={() => navigation.navigate('User')}
      />
      <Button
        title="User Profile"
        onPress={() => navigation.navigate('UserProfile')}
      />
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
})
