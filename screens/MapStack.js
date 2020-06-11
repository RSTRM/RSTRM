import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Map from './Map'
import Filter from './Filter'
import Add from './Add'


export default function MapStack() {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator initialRouteName="Map">
            <Drawer.Screen name="Map" component={Map}/>
            <Drawer.Screen name="Filter" component={Filter}/>
            <Drawer.Screen name="Add" component={Add}/>
        </Drawer.Navigator>
    );
}

