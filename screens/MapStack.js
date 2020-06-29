import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Map from './Map'


export default function MapStack() {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator initialRouteName="Map">
            <Drawer.Screen name="Map" component={Map}/>
        </Drawer.Navigator>
    );
}

