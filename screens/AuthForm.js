import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import { auth } from "../store/user";

const AuthForm = (props) => {
  const { name, handleSubmit, error } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        onChange={(event) => setEmail(event.nativeEvent.text)}
        style={styles.textInput}
        placeholder="  Email"
        autoCapitalize="none"
      ></TextInput>
      <TextInput
        value={password}
        onChange={(event) => setPassword(event.nativeEvent.text)}
        style={styles.textInput}
        placeholder="  Password"
        autoCapitalize="none"
        secureTextEntry={true}
      ></TextInput>
      <Button
        disabled={!email || !password}
        name={name}
        title="Log In"
        onPress={() => {
          handleSubmit(email, password, props);
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


const mapDispatch = (dispatch) => {
  return {
    handleSubmit(email, password, props) {
      dispatch(auth("", "", "", email, password, "login", props));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: { height: 40, width: "85%", borderColor: "gray", borderWidth: 1 },
});
