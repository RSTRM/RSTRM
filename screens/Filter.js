import React, { useState } from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'
import { Container, Header, Left, Title, Body, Button, Icon } from 'native-base';



export default function Filter({navigation}) {
    const [isEnabled, setIsEnabled] = useState(false)

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={styles.container}>
            <Container>
                <Header>
                    <Left>
                    <Button transparent>
                        <Icon name='ios-menu' onPress={()=> navigation.openDrawer()}/>
                    </Button>
                    </Left>
                    <Body>
                        <Title>Filter your options</Title>
                    </Body>
                </Header>
            </Container>
            <View style={styles.first}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Text>Unisex Restroom</Text>
            </View>
            <View style={styles.second}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Text>Handicap Accessible</Text>
            </View>
            <View style={styles.third}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Text>Changing Table</Text>
            </View>
            <View style={styles.third}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Text>Rating</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //alignItems: 'center',
      justifyContent: 'center',
    }
})
