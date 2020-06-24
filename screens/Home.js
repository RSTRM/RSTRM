import React from "react";
import { connect } from "react-redux";
import { logout } from "../store/user";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import headerimg from "../assets/header-img.png";

function Home({ navigation, user, signOut }) {
  return (
    <ImageBackground source={headerimg} style={styles.bottomTab}>
      <View style={styles.container}>
        <Text style={{fontSize: 28, marginBottom: 10}}>Welcome to RSTRM!</Text>
        <Text>{`  `}</Text>

        <Text style={{fontSize: 18, marginBottom: 10}}>For when you gotta go...</Text>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "white",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomTab: {
    color: "white",
    flex: 1,
    resizeMode: "cover",
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
