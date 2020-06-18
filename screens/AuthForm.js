import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import user, { auth, me } from "../store/user";

const AuthForm = (props) => {
  const {
    name,
    displayName,
    handleSubmit,
    error,
    navigation,
    user,
    getCurrentUser,
  } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        onChange={(event) => setEmail(event.nativeEvent.text)}
        style={styles.textInput}
        placeholder="email"
        autoCapitalize="none"
      ></TextInput>
      <TextInput
        value={password}
        onChange={(event) => setPassword(event.nativeEvent.text)}
        style={styles.textInput}
        placeholder="password"
        autoCapitalize="none"
        secureTextEntry={true}
      ></TextInput>
      <Button
        disabled={!email || !password}
        name={name}
        title="Log In"
        onPress={async () => {
          await handleSubmit(email, password);
          navigation.navigate("Home");
        }}
      ></Button>
      {error && error.response && <Text> {error.response.data} </Text>}
    </View>
  );
};

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error,
    user: state.user,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(email, password) {
      dispatch(auth(email, password, "login"));
    },
    getCurrentUser() {
      dispatch(me());
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: { height: 40, width: "85%", borderColor: "gray", borderWidth: 1 },
});
