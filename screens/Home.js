import React from "react";
import { connect } from "react-redux";
import { logout } from "../store/user";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import headerimg from "../assets/header-img.png";


function Home({ navigation, user, signOut }) {
  return (
    <ImageBackground source={headerimg} style={styles.bottomTab}>
      <View style={styles.container}>
        {user.id ? (
          <View>
            <Text style={{fontSize: 28, marginBottom: 10, textAlign: "center"}}>Welcome to RSTRM {user.nameFirst[0].toUpperCase()+user.nameFirst.slice(1)}</Text>
            <Text style={{fontSize: 18, marginBottom: 10}}>Click the Map Icon to see your nearest restroom.</Text>
            <Button title="Logout" onPress={signOut} />
            <Button
              title="User Profile"
              onPress={() => navigation.navigate("UserProfile")}
            />
          </View>
        ) : (
          <View>
            <Text style={{fontSize: 28, marginBottom: 10}}>Welcome to RSTRM!</Text>
            <Text style={{fontSize: 18, marginBottom: 10}}>For when you gotta go...</Text>
            <Button
              title="User Sign/Login"
              onPress={() => navigation.navigate("User")}
            />
          </View>
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
    //alignItems: "center",
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
