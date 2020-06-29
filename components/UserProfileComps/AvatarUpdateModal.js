import React from 'react'
import {
    StyleSheet,
    Dimensions,
    ImageBackground,
} from 'react-native'
import { Block, Text, theme } from 'galio-framework'
import { LinearGradient } from 'expo-linear-gradient'
import { Images, materialTheme } from '../../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'

const AvatarUpdateModal = () => {
    return (<Modal visible={visible} animationType="slide"><Text>TEST</Text></Modal>)
}
