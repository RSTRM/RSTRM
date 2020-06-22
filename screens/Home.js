import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { logout } from "../store/user";

function Home({ navigation, user, signOut }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to RSTRM!</Text>
      <Text>For when you gotta go...</Text>
      {user.id ? (
        <View>
          <Button title="Logout" onPress={signOut} />
          <Button
            title="Account Settings"
            onPress={() => navigation.navigate("Setting")}
          />
          <Button
            title="User Profile"
            onPress={() => navigation.navigate("UserProfile")}
          />
        </View>
      ) : (
        <Button
          title="User Sign/Login"
          onPress={() => navigation.navigate("User")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
