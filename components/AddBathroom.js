import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  Button
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import { Images, materialTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { connect } from "react-redux";
import { loadReviews } from "../store/reviews";
import headerimg from "../assets/header-img.png";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

class AddBathroom extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps) {
    // if (prevProps !== this.props) {
    //   this.setState({ index: this.props.index });
    //   const index = this.state.index;
    // }
  }

  render() {
    const backButton = this.props.backButton;

    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={headerimg}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}
          >
            <Block flex style={styles.profileDetails}>
              <Block style={styles.profileTexts}>
                <Block style={styles.backButton}>
                  <Icon
                    raised
                    reverse
                    name="close"
                    type="material"
                    color="black"
                    onPress={() => backButton()}
                  />
                </Block>
              </Block>
              <LinearGradient
                colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
                style={styles.gradient}
              />
            </Block>
          </ImageBackground>
        </Block>
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block row space="between" style={{ padding: theme.SIZES.BASE }}>
              <Block middle>
                <Icon
                  name="emoticon-poop"
                  type="material-community"
                  color="brown"
                  size={24}
                  // onPress={() => ()}
                />
                <Text muted size={12}>
                  Add Review
                </Text>
              </Block>
            </Block>
            <Block
              row
              space="between"
              style={{ paddingVertical: 16, alignItems: "baseline" }}
            >
              <Text size={16}>Recent Reviews</Text>

              <Text
                size={12}
                color={theme.COLORS.GRADIENT_END}
                // onPress={() => this.props.navigation.navigate("Home")}
              >
                Tweet
              </Text>
            </Block>
            <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
              <Block row space="between" style={{ flexWrap: "wrap" }}>
                {reviews.map(review => (
                  <Text size={16} key={review.id}>
                    {review.comments}
                  </Text>
                ))}
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2
  },
  profileImage: {
    width: width * 1.1,
    height: "auto"
  },
  profileContainer: {
    width: width,
    height: height / 2
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: "flex-end",
    position: "relative"
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  options: {
    position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: "30%",
    position: "absolute"
  },
  backButton: {
    alignSelf: "flex-end",
    marginTop: 20,
    position: "absolute",
    opacity: 0.7
  }
});

const mapDispatchToProps = dispatch => {
  return {
    createBathroom(bathroom) {
      dispatch(createBathroom(bathroom));
    }
  };
};

export default connect(null, mapDispatchToProps)(AddBathroom);
