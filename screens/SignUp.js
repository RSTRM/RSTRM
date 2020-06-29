import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import { auth } from "../store/user";

const SignUp = (props) => {
  const { name, handleSubmit, error } = props;
  const [nameFirst, setNameFirst] = useState("");
  const [nameLast, setNameLast] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        value={nameFirst}
        onChange={(event) => setNameFirst(event.nativeEvent.text)}
        style={styles.textInput}
        placeholder="  First Name"
        autoCapitalize="none"
      ></TextInput>
      <TextInput
        value={nameLast}
        onChange={(event) => setNameLast(event.nativeEvent.text)}
        style={styles.textInput}
        placeholder="  Last Name"
        autoCapitalize="none"
      ></TextInput>
      <TextInput
        value={username}
        onChange={(event) => setUsername(event.nativeEvent.text)}
        style={styles.textInput}
        placeholder="  Username"
        autoCapitalize="none"
      ></TextInput>
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
      <TextInput
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.nativeEvent.text)}
        style={styles.textInput}
        placeholder="  Confirm Password"
        autoCapitalize="none"
        secureTextEntry={true}
      ></TextInput>
      <Button
        disabled={
          !nameFirst ||
          !nameLast ||
          !username ||
          !email ||
          !password ||
          password !== confirmPassword
        }
        name={name}
        title="Sign Up"
        onPress={() => {
          handleSubmit(nameFirst, nameLast, username, email, password, props);
        }}
      ></Button>
      {error && error.response && <Text> {error.response.data} </Text>}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit(nameFirst, nameLast, username, email, password, props) {
      dispatch(
        auth(nameFirst, nameLast, username, email, password, "signup", props)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: { height: 40, width: "85%", borderColor: "gray", borderWidth: 1 },
});
