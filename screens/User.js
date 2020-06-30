import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Google from "expo-google-app-auth";
import { GOOGLE_CLIENT_ID } from "../secrets";
import { connect } from "react-redux";
import { auth, me } from "../store/user";
import axios from "axios";

const HOST = "https://server-rstrm.herokuapp.com";
// const HOST = "http://localhost:8080";

function User(props) {
  const signIn = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: GOOGLE_CLIENT_ID,
        scopes: ["profile", "email"],
        redirectUrl: "host.exp.exponent:/oauth2redirect/google",
      });
      if (result.type === "success") {
        const users = (await axios.get(`${HOST}/api/users`)).data;
        const selectedUser = await users.find(
          (_user) => result.user.email === _user.email
        );
        if (selectedUser) {
          await props.login(result.user.email, props, result.user.id);
        } else {
          await props.signUp(
            result.user.givenName,
            result.user.familyName,
            result.user.email,
            result.user.email,
            props,
            result.user.id
          );
        }
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}>If you don't have an account:</Text>
      <Button
        title="Sign up"
        onPress={() => props.navigation.navigate("SignUp")}
      />
      <Text style={{ textAlign: "center" }}>
        Log in if you already have an account:
      </Text>
      <Button
        title="Log in"
        onPress={() => props.navigation.navigate("AuthForm")}
      />
      <LoginWithGoogle signIn={signIn} />
    </View>
  );
}

const LoginWithGoogle = ({ signIn }) => {
  return (
    <View>
      <Button
        title="Or log in with your Google account"
        onPress={() => signIn()}
      />
    </View>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login(email, props, googleId) {
      dispatch(auth("", "", "", email, "", "login", props, googleId));
    },
    signUp(nameFirst, nameLast, username, email, props, googleId) {
      dispatch(
        auth(
          nameFirst,
          nameLast,
          username,
          email,
          "",
          "signup",
          props,
          googleId
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);

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
