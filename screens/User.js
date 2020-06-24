import React, {useState} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import * as Google from 'expo-google-app-auth';
import {GOOGLE_CLIENT_ID} from '../secrets'

export default function User({ navigation }) {
  const [signedIn, setSignedIn] = useState(false);
  const [name, setName] = useState("");

    signIn = async () => {
        try {
            const result = await Google.logInAsync({
                iosClientId: GOOGLE_CLIENT_ID,
                scopes: ["profile", "email"],
                redirectUrl: 'host.exp.exponent:/oauth2redirect/google'
            })
            if (result.type === "success") {
                //return result.accessToken;
                setSignedIn(true),
                setName(result.user.name)
            } else {
                console.log("cancelled")
            }
        } catch (e) {
          console.log("error", e)
        }
    }
  

  return (
    <View style={styles.container}>
      {signedIn ? (
        <LoggedIn name={name} />
      ) : (
        <View>
          <Text style={{textAlign: "center"}}>If you don't have an account:</Text>
          <Button title="Sign up" onPress={() => navigation.navigate("SignUp")}/>
          <Text style={{textAlign: "center"}}>Log in if you already have an account:</Text>
          <Button title="Log in" onPress={() => navigation.navigate("AuthForm")}/>
          <LoginWithGoogle signIn={signIn} />
        </View>
      )}
    </View>
  );
}

const LoggedIn = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome: {name}</Text>
    </View>
  );
};

const LoginWithGoogle = ({ signIn }) => {
  return (
    <View>
      <Button title="Or log in with your Google account" onPress={() => signIn()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 25,
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150,
  },
});
