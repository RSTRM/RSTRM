import React from "react";
import { connect } from "react-redux";
import { logout } from "../store/user";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import splash3 from "../assets/splash3.png";

function Home({ navigation, user, signOut }) {
  return (
    <ImageBackground source={splash3} style={styles.bottomTab}>
      <View style={styles.container}>
        {user.id ? (
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>
              Welcome to RSTRM{', '}
              {user.nameFirst[0].toUpperCase() + user.nameFirst.slice(1)}
            </Text>
            <Text style={styles.textSubTitle}>
              Click the Map Icon to see your nearest restroom.
            </Text>
            <Button title="Logout" onPress={signOut} />
            <Button
              title="User Profile"
              onPress={() => navigation.navigate('UserProfile')}
            />
          </View>
        ) : (
          <View style={styles.login}>
            {/* <Text style={styles.textTitle}>Welcome to RSTRM!</Text>
            <Text style={styles.textSubTitle}>For when you gotta go...</Text> */}
            <Button 
              title="User Sign/Login"
              onPress={() => navigation.navigate('User')}
              color={'blue'}
            />
          </View>
        )}
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: 'white',
    flex: 1,
    justifyContent: 'center',
    
  },
  textContainer: {
    padding: 15,
    
  },
  textTitle: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
  },
  textSubTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  bottomTab: {
    color: 'white',
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    flex: 1,
    position: "absolute",
    alignSelf:"flex-start",
    marginStart: -35,
    paddingVertical: 100,
  }
})

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
