import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Container, Header, Left, Body, Title, Button, Icon } from 'native-base';



export default function Setting({navigation}) {
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
                        <Title>Add a Restroom</Title>
                    </Body>
                </Header>
            </Container>
            <Text>Add new restrooms ...</Text>
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
