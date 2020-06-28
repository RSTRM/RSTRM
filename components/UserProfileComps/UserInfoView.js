import React from 'react'
import {
    StyleSheet,
    Dimensions,
    ImageBackground,
} from 'react-native'
import { Block, Text, theme } from 'galio-framework'
import { LinearGradient } from 'expo-linear-gradient'
import { Images, materialTheme } from '../../constants'
import { connect } from 'react-redux'

const { width, height } = Dimensions.get('screen')
const thumbMeasure = (width - 48 - 32) / 3

const UserInfoView = ({ user }) => {
    const fullName = `${user.nameFirst} ${user.nameLast}`
    const statusGenerator = (reviewCount = 0) => {
        if (reviewCount > 30) {
            return 'Elite'
        } else if (reviewCount > 10) {
            return 'Pro'
        } else {
            return 'User'
        }
    }

    return (
        <Block flex>
            <ImageBackground
                //will connect data-image to source field below here
                source={{ uri: user.avatar || Images.Avatar }}
                style={styles.profileContainer}
                imageStyle={styles.profileImage}>
                <Block flex style={styles.profileDetails}>
                    <Block style={styles.profileTexts}>
                        <Block row space="between">
                            <Block row>
                                <Block middle style={styles.status}>
                                    <Text size={16} color="black">
                                        {statusGenerator(user.totalReviews)}
                                    </Text>
                                </Block>
                            </Block>
                            <Block>
                                <Text color="white" size={16}>
                                    {fullName}
                                </Text>
                            </Block>
                        </Block>
                    </Block>
                    <LinearGradient
                        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                        style={styles.gradient}
                    />
                </Block>
            </ImageBackground>
        </Block>
    )
}

const styles = StyleSheet.create({
    profileImage: {
        width: width * 1.1,
        height: 'auto',
    },
    profileContainer: {
        width: width,
        height: height / 2.7,
    },
    profileDetails: {
        paddingTop: theme.SIZES.BASE * 4,
        justifyContent: 'flex-end',
        position: 'relative',
    },
    profileTexts: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE * 2,
        zIndex: 2,
    },
    status: {
        backgroundColor: materialTheme.COLORS.ACTIVE,
        paddingHorizontal: 6,
        marginRight: theme.SIZES.BASE / 2,
        borderRadius: 4,
        height: 19,
        width: 50,
        justifyContent: 'center'
    },
    gradient: {
        zIndex: 1,
        left: 0,
        right: 0,
        bottom: 0,
        height: '30%',
        position: 'absolute',
    },
})

const mapState = ({ user }) => ({ user })


export default connect(mapState, null)(UserInfoView)
