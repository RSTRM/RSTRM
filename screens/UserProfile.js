import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  Button,
  Modal,
  View,
} from 'react-native'
import { Block, Text, theme } from 'galio-framework'
import { HeaderHeight } from '../constants/utils'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBarView, UserInfoView, ListItems } from '../components/UserProfileComps'

const { width, height } = Dimensions.get('screen')
const thumbMeasure = (width - 48 - 32) / 3

const UserProfile = ({ user, loadUserItems }) => {
  const [displayListName, setDisplayListName] = useState('')
  const [displayListLabel, setDisplayListLabel] = useState('')
  const [displayListAssociation, setDisplayListAssociation] = useState('')

  setDisplayHandler = (name, label, association) => {
    //console.log(`set display to ${name} - ${label} - ${association.table}.${association.field}`)
    setDisplayListName(name)
    setDisplayListLabel(label)
    setDisplayListAssociation(association)
  }

  return (
    <Block flex style={styles.profile}>
      <UserInfoView />
      <Block flex style={styles.options}>
        <IconBarView setDisplayHandler={setDisplayHandler} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block
            row
            space="between"
            style={{ paddingVertical: 16, alignItems: 'baseline' }}>
            <Text size={20}>{displayListLabel || `Welcome, ${user.nameFirst}!`}</Text>
          </Block>
          <Text style={{ opacity: !displayListLabel ? 100 : 0 }}>Checkout your badges, reviews, and checkins by clicking above!</Text>
          <ListItems name={displayListName} association={displayListAssociation} />
          <View>
          </View>
        </ScrollView>
      </Block>
    </Block>
  )
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 1,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
})

const mapState = ({ user }) => ({ user })

export default connect(mapState)(UserProfile)
