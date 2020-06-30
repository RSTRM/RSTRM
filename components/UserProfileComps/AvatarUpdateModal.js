import React, { useState } from 'react'
import {
    View,
    Modal,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Button
} from 'react-native'
import { Block, Text, theme } from 'galio-framework'
import { LinearGradient } from 'expo-linear-gradient'
import { Images, materialTheme } from '../../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { avatarOptions } from './avatarOptions'
import { updateUser } from '../../store/user'

const { width, height } = Dimensions.get('screen')
const thumbMeasure = (width - 48 - 32) / 3

const AvatarUpdateModal = ({ user, visible, avatarViewUpdate, updateUserAvatar }) => {

    const [avatarSelected, setAvatarSelected] = useState('')
    const [avatarSelectedImageUrl, setAvatarSelectedImageUrl] = useState('')

    const updateViewMode = (bool = false) => {
        avatarViewUpdate(bool)
    }

    const onAvatarOptionPress = (avatar) => {
        setAvatarSelected(avatar.name)
        setAvatarSelectedImageUrl(avatar.url)
    }

    const updateAvatar = () => {
        const action = 'imageURL'
        updateUserAvatar(user.id, action, avatarSelectedImageUrl)
        updateViewMode(false)
    }

    const disabled = () => {
        if (avatarSelected) return false
        return true
    }

    return (<Modal visible={visible} animationType="slide">
        <View style={styles.inputContainer}>
            <View style={styles.avatarList}>
                {avatarOptions.map(option => (
                    <TouchableOpacity key={option.name} onPress={onAvatarOptionPress.bind(this, option)}>
                        <ImageBackground
                            //will connect data-image to source field below here
                            source={{ uri: option.url }}
                            style={styles.optionContainer}
                            imageStyle={styles.optionImage}>
                        </ImageBackground>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.textContainer}>
                <Text>You selected: {avatarSelected} </Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button
                        title="Update"
                        onPress={updateAvatar}
                        disabled={disabled()}
                    />
                </View>
                <View style={styles.button}>
                    <Button title="Cancel" color="red" onPress={updateViewMode} />
                </View>
            </View>
        </View>
    </Modal>)
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarList: {
        marginTop: 50,
        marginBottom: 15,
        flex: 10,
        width: '80%',
        // borderColor: 'black',
        // borderWidth: 1,
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 2,
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        width: '60%',
        marginBottom: 10
    },
    button: {
        flex: 1,
    },
    optionImage: {
        width: 'auto',
        height: 'auto',
        resizeMode: 'contain'
    },
    optionContainer: {
        width: 110,
        height: 110,
        margin: 5
    },
    textContainer: {
        flex: 1,
        margin: 10
    },
})

const mapState = ({ user }) => ({ user })

const mapDispatch = (dispatch) => {
    return {
        updateUserAvatar: (id, action, item) => {
            dispatch(updateUser(id, action, item))
        },
    }
}




export default connect(mapState, mapDispatch)(AvatarUpdateModal)