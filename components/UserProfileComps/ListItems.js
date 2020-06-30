import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Block, Text, theme } from 'galio-framework'
import { Icon, Image } from 'react-native-elements'
import moment from 'moment'
import { materialTheme } from '../../constants'
import { StyleSheet } from 'react-native'
import { View } from 'native-base'
import { HeaderHeight } from '../../constants/utils'
import tpMarker from '../../assets/tp-marker.png'

const ListItems = ({ name, association, user }) => {
    const listToDisplay = user[name] || []
    const defaultImage = tpMarker

    const imageMaker = (path = null) => {
        if (path) {
            return { uri: path }
        } else return defaultImage
    }


    return (
        <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
            <Block >
                {listToDisplay.map(item => {
                    const table = item[association.table]
                    const name = table[association.nameField]
                    const date = moment(table.createdAt).format("MMMM D, YYYY h:mma")
                    return (<View key={item.id} style={styles.listItem}>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Image
                                style={{ width: 50, height: 50 }}
                                source={imageMaker(table.imageURL)}
                                resizeMode="cover"
                            />
                        </View >
                        <View style={{ flex: 3, alignItems: "start", justifyContent: "center" }}>
                            <Text style={styles.textItem}>{name}</Text>
                            <Text style={styles.dateItem}>{date}</Text>
                        </View>
                    </View>)
                })
                }
            </Block>
        </Block>
    )
}

const styles = StyleSheet.create({
    textItem: {
        fontSize: 16,
        color: materialTheme.COLORS.GRADIENT_START,
        padding: 1,
    },
    dateItem: {
        fontSize: 12,
        color: materialTheme.COLORS.PLACEHOLDER,
        padding: 1,
    },
    listItem: {
        flexDirection: "row",
        padding: 5,
        // borderColor: materialTheme.COLORS.DEFAULT,
        // borderWidth: 1,
        borderRadius: 5,
        margin: 10,
    },
})

const mapState = ({ user }) => ({ user })


export default connect(mapState)(ListItems)