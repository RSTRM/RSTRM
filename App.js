import React from "react";
import { AppRegistry } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Map from "./screens/Map";
import RestroomView from "./screens/Restroom";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeStack from "./screens/HomeStack";
import MapStack from "./screens/MapStack";
import { connect } from "react-redux";
import store from "./store";
import { Provider } from "react-redux";

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = "ios-home";
              } else if (route.name === "Map") {
                iconName = "ios-globe";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray"
          }}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Map" component={MapStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
