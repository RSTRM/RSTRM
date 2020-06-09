import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeStackScreen from './screens/HomeStackScreen'
import MapStackScreen from './screens/MapStackScreen'


export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if(route.name === 'Home'){
            iconName = 'ios-home'
          }
          else if(route.name === 'Map'){
            iconName = 'ios-globe'
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Map" component={MapStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}


