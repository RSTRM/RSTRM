import React, { useState, useEffect } from 'react'
import { Text, View, Switch } from 'react-native'


export default function Filter({filterFn}) {

    const [isEnabled, setIsEnabled] = useState(false)
    const [isEnabled2, setIsEnabled2] = useState(false)
    const [isEnabled3, setIsEnabled3] = useState(false)

    const toggleSwitch = () => setIsEnabled(!isEnabled); 
    const toggleSwitch2 = () => setIsEnabled2(!isEnabled2); 
    const toggleSwitch3 = () => setIsEnabled3(!isEnabled3); 
    
    // useEffect(() => {
    //     if(isEnabled){
    //         filterFn(isEnabled, 'unisex')
    //     }
    // }, [isEnabled])

    // useEffect(() => {
    //     isEnabled2 ? filterFn(isEnabled2, 'accessible') : filterFn(!isEnabled2, '')
    // }, [isEnabled2])

    // useEffect(() => {
    //     isEnabled3 ? filterFn(isEnabled3, 'changingTable') : filterFn(!isEnabled3, '')
    // }, [isEnabled3])


    return (
        <View>
            <View>
                <Text>Unisex Restrooms</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View>
                <Text>Accessible Restrooms</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled2 ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onChange={toggleSwitch2}
                    value={isEnabled2}
                />
            </View>
            <View>
                <Text>Changing Table Restrooms</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled3 ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onChange={toggleSwitch3}
                    value={isEnabled3}
                />
            </View>
        </View>
    )
}



