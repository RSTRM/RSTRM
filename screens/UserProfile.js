import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  Button,
  Modal,
  View,
} from 'react-native'
import { Block, Text, theme } from 'galio-framework'
import { LinearGradient } from 'expo-linear-gradient'
import { Icon, Avatar, Badge } from 'react-native-elements'
import { Images, materialTheme } from '../constants'
import { HeaderHeight } from '../constants/utils'
import { connect } from 'react-redux'

const { width, height } = Dimensions.get('screen')
const thumbMeasure = (width - 48 - 32) / 3

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      modalVisible: false,
      checkin: {},
    }
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps) {}

  backButton = () => {
    this.setState({ modalVisible: false })
  }

  render() {
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            //will connect data-image to source field below here
            source={{ uri: Images.Avatar }}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
            <Block flex style={styles.profileDetails}>
              <Block style={styles.profileTexts}>
                {/* <Text color="white" size={24} style={{ paddingBottom: 30 }}>
                  User Name
                </Text> */}
                <Block row space="between">
                  <Block row>
                    <Block middle style={styles.pro}>
                      <Text size={16} color="black">
                        Elite
                      </Text>
                    </Block>
                    {/* <Text color="white" size={16} muted style={styles.seller}>
                      Reviews
                    </Text>
                    <Text size={16} color={materialTheme.COLORS.WARNING}>
                      4.9{' '}
                    </Text> */}
                  </Block>
                  <Block>
                    <Text color="white" size={16}>
                      User Name
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
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block row space="between" style={{ padding: theme.SIZES.BASE }}>
              <Block middle>
                {/* <View>
                  <Badge
                    status="success"
                    containerStyle={{
                      position: 'absolute',
                      top: -4,
                      right: -4,
                    }}
                  />
                </View> */}
                <Icon
                  name="medal"
                  type="material-community"
                  color="purple"
                  size={24}
                  onPress={() => 'pressed'}
                />

                <Text muted size={12}>
                  Badges
                </Text>
              </Block>
              <Block middle>
                <Icon
                  name="message-draw"
                  type="material-community"
                  color="purple"
                  size={24}
                  onPress={() => 'pressed'}
                />
                <Text muted size={12}>
                  Reviews
                </Text>
              </Block>
              <Block middle>
                <Icon
                  name="account-check"
                  type="material-community"
                  color="purple"
                  size={24}
                  onPress={() => 'pressed'}
                />
                <Text muted size={12}>
                  Checkins
                </Text>
              </Block>
            </Block>
            <Block
              row
              space="between"
              style={{ paddingVertical: 16, alignItems: 'baseline' }}>
              <Text size={16}>Recent Reviews</Text>

              <Text
                size={12}
                color={theme.COLORS.GRADIENT_END}
                // onPress={() => this.props.navigation.navigate("Home")}
              >
                More
              </Text>
            </Block>
            <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
              <Block row space="between" style={{ flexWrap: 'wrap' }}>
                <Text size={16}>LIST</Text>
              </Block>
            </Block>
            <View>
              {/* <Button
                title="Check In"
                onPress={async () => {
                  await postCheckin({
                    userId: user.id,
                    bathroomId: bathroom.id,
                  })
                  this.setState({ modalVisible: true })
                }}></Button>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                on></Modal> */}
            </View>
          </ScrollView>
        </Block>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 1,
  },
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
  pro: {
    backgroundColor: materialTheme.COLORS.ACTIVE,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 42,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
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
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
  backButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
    position: 'absolute',
    opacity: 0.7,
  },
})

export default connect(null)(UserProfile)
