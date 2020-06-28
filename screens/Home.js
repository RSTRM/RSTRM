import React from "react";
import { connect } from "react-redux";
import { logout } from "../store/user";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import home from "../assets/home.png";

function Home({ navigation, user, signOut }) {
  return (
    <ImageBackground source={home} style={styles.bottomTab}>
      <View style={styles.container}>
        {user.id ? (
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>
              {user.nameFirst[0].toUpperCase() + user.nameFirst.slice(1)}
            </Text>
            <View style={styles.textSubTitle}>
              <Button title="Logout" onPress={signOut} />
              <Button
                title="User Profile"
                onPress={() => navigation.navigate("UserProfile")}
              />
            </View>
          </View>
        ) : (
          <View style={styles.login}>
            {/* <Text style={styles.textTitle}>Welcome to RSTRM!</Text>
            <Text style={styles.textSubTitle}>For when you gotta go...</Text> */}
            <Button
              title="User Sign/Login"
              onPress={() => navigation.navigate("User")}
              color={"blue"}
            />
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  },
  textContainer: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    padding: 20,
    marginTop: 100
  },
  textTitle: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    paddingStart: 50,
    fontSize: 30,
    marginTop: 60,
    textAlign: "center",
    color: "blue",
    fontWeight: "bold"
  },
  textSubTitle: {
    flex: 1,
    position: "relative",
    paddingStart: 50,
    fontSize: 10,
    marginTop: 80,
    textAlign: "center",
    fontWeight: "bold"
  },
  bottomTab: {
    color: "blue",
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center"
  },
  login: {
    flex: 1,
    position: "absolute",
    alignSelf: "flex-start",
    marginStart: -35,
    paddingVertical: 100
  }
});

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
