import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home'
import Map from './screens/Map'
import RestroomView from './screens/Restroom'


export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Restroom" component={RestroomView} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}


