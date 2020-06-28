import React from 'react'
import { Block, Text, theme } from 'galio-framework'
import { Icon } from 'react-native-elements'
import { materialTheme } from '../../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default IconBarView = ({ setDisplayHandler }) => {

    //choose from https://materialdesignicons.com/

    iconBar = [
        {
            label: 'Badges',
            name: 'userBadges',
            association: { table: 'badge', nameField: 'nameDisplay' },
            icon: 'medal',
        },
        {
            label: 'Reviews',
            name: 'userReviews',
            association: { table: 'bathroom', nameField: 'establishment' },
            icon: 'message-draw',
        },
        {
            label: 'Checkins',
            name: 'userCheckins',
            association: { table: 'bathroom', nameField: 'establishment' },
            icon: 'bookmark-check',
        },
    ]

    iconMaker = (icon, color = materialTheme.COLORS.INACTIVE) => {
        return (<Icon name={icon} type="material-community" color={color} size={24} />)
    }

    return (
        <Block row space="between" style={{ padding: theme.SIZES.BASE }}>
            {iconBar.map((item) => (
                <TouchableOpacity
                    key={item.icon}
                    name={item.name}
                    label={item.label}
                    onPress={setDisplayHandler.bind(this, item.name, item.label, item.association)}>
                    <Block middle>
                        {iconMaker(item.icon)}
                        <Text muted size={12}>
                            {item.label}
                        </Text>
                    </Block>
                </TouchableOpacity>
            ))}
        </Block>
    )
}
