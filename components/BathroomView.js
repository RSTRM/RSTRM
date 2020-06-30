import React, { Component } from "react";
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
  TouchableOpacity
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import { Images, materialTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { connect } from "react-redux";
import AddReview from "./AddReview";
import { createCheckin } from "../store/checkins";
import { loadReviews } from "../store/reviews";
import { SliderBox } from "react-native-image-slider-box";
import headerimg from "../assets/header-img.png";
import * as MediaLibrary from "expo-media-library";
import { RNS3 } from "react-native-aws3";
import Cam from "./Cam";
import { addImage } from "../store/bathrooms";
import { AWS } from "../secrets";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

// const images = Restroom.Restroom;

// const randomizer = (images) => {
//   let arr = [];
//   for (let i = 0; i < 3; i++) {
//     const randomImages = images[Math.floor(Math.random() * images.length)];
//     arr.push(randomImages);
//   }
//   return arr;
// };

class BathroomView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // index: 0,
      modalVisible: false,
      checkin: {},
      imgURI: " ",
      imgURL:
        "no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg",
      modal2Visible: false,
      modal3Visible: false,
      bathroom: {}
    };
  }
  async componentDidMount() {
    this.props.loadReviews(this.props.bathroom.id)
    // this.setState({ index: this.props.index });
    // const index = this.state.index;

    // if (this.props.bathrooms) {
    //   this.props.loadReviews(this.props.bathrooms[index].id);
    // }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.bathroom.id !== this.props.bathroom.id) {
      this.props.loadReviews(this.props.bathroom.id)
    }
    // if (prevProps !== this.props) {
    //   this.setState({ index: this.props.index });
    //   const index = this.state.index;
    // }
  }

  backButton = () => {
    this.setState({ modalVisible: false });
  };
  backButton3 = () => {
    this.setState({ modal3Visible: false });
  };

  bathroomImage = async asset => {
    this.setState({ imgURI: asset.uri });
    await this.onImageAdded(asset);
  };

  onImageAdded = async asset => {
    const file = {
      uri: this.state.imgURI,
      name: asset.filename,
      type: "image/png"
    };

    const options = {
      keyPrefix: "uploads/",
      bucket: "rstrmimagesbucket",
      region: "us-east-2",
      accessKey: AWS.accessKey,
      secretKey: AWS.secretKey,
      successActionStatus: 201
    };

    await RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");

      console.log(response.body, "response after success!");

      const url = response.body.postResponse.location.split("/");
      this.setState({ imgURL: url[3] });
      this.submitPicture();
    });
  };

  submitPicture = async () => {
    console.log(this.props.bathroom.id, "id");
    console.log(this.state.imgURL, "imgURL in state");
    await this.props.addImage(this.props.bathroom.id, this.state.imgURL);
  };

  render() {
    console.log(this.props, 'in render');
    const {
      user,
      backButton,
      postCheckin,
      getDirections,
      reviews,
    } = this.props;
    // const index = this.state.index || 0;
    const bathroom = this.props.bathroom || {};
    // const bathroom = this.props.bathrooms[index] || {};
    const desCoord = `${bathroom.latitude},${bathroom.longitude}`;
    const addImage = this.props.addImage;
    let images;
    if (!bathroom.images) {
      images = [
        "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg"
      ];
    } else if (bathroom.images) {
      images = bathroom.images.map(img => img.imageURL)
      // .reverse();
    }
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <SliderBox
            images={images}
            style={styles.profileContainer}
            sliderBoxHeight={100}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
          />

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
              <Block style={styles.cameraIcon}>
                <Icon
                  reverse
                  name="camera"
                  type="material-community"
                  color="#0077F6"
                  underlayColor="purple"
                  onPress={() => {
                    this.setState({ modal3Visible: true });
                  }}
                />
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modal3Visible}
                  on
                >
                  <Cam
                    backButton={this.backButton3}
                    bathroomImage={this.bathroomImage}
                  />
                </Modal>
              </Block>

              <Block row space="between">
                <Block row>
                  <Text color="white" size={16} muted style={styles.seller}>
                    Establishment
                  </Text>
                  <Text size={16} color={materialTheme.COLORS.WARNING}>
                    4.9{" "}
                  </Text>
                </Block>
                <Block>
                  <Text color={theme.COLORS.MUTED} size={16}>
                    {` `} {bathroom.city}{" "}
                  </Text>
                </Block>
              </Block>
            </Block>
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
              style={styles.gradient}
            />
          </Block>
        </Block>
        <Block flex style={styles.options}>
          <ImageBackground source={headerimg} style={styles.flex}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Block row space="between" style={{ padding: theme.SIZES.BASE }}>
                <Block middle>
                  <Text bold size={12} style={{ marginBottom: 8 }}>
                    {reviews.length}
                  </Text>
                  <Text muted size={12}>
                    Reviews
                  </Text>
                </Block>
                <Block middle>
                  <Text bold size={12} style={{ marginBottom: 8 }}>
                    {bathroom.avgRating || 3}
                  </Text>
                  <Text muted size={12}>
                    Avg Rtg
                  </Text>
                </Block>
                <Block middle>
                  <Icon
                    size={24}
                    name="walk"
                    type="material-community"
                    color="white"
                    onPress={() => getDirections(desCoord, bathroom)}
                  />
                  <Text muted size={12}>
                    Directions
                  </Text>
                </Block>
                <Block middle>
                  <Icon
                    disabledStyle={{ backgroundColor: "none", color: "blue" }}
                    name="bookmark-check"
                    type="material-community"
                    color="gold"
                    size={24}
                    onPress={async () => {
                      if (user.id) {
                        await postCheckin({
                          userId: user.id,
                          bathroomId: bathroom.id
                        });
                        this.setState({ modalVisible: true });
                      } else {
                        await backButton();
                        await this.props.navigation.navigate("User");
                      }
                    }}
                  />

                  <Text muted size={12}>
                    Check In
                  </Text>
                </Block>
              </Block>
              <Block
                row
                space="between"
                style={{
                  paddingVertical: 16,
                  alignItems: "baseline",
                  color: "white"
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold"
                  }}
                  color={"white"}
                  size={18}
                >
                  Recent Reviews
                </Text>
              </Block>
              <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                <Block style={{ flex: 1, color: "white" }}>
                  {reviews.map(review => (
                    <View key={review.id}>
                      <Text
                        size={16}
                        key={review.id}
                        color={theme.COLORS.WHITE}
                        style={{ flex: 1 }}
                      >
                        {"\n"}
                        {review.comments}
                        {"\n"}
                      </Text>
                    </View>
                  ))}
                </Block>
              </Block>
              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalVisible}
                  on
                >
                  <AddReview backButton={this.backButton} bathroom={bathroom} />
                </Modal>
              </View>
            </ScrollView>
          </ImageBackground>
        </Block>
        <Text color="white" size={23} style={styles.title}>
          {bathroom.establishment}{" "}
        </Text>
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
    zIndex: 1,
    fontWeight: "bold"
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2
  },
  options: {
    position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: "#005DFF",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    color: "white"
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
    height: "0%",
    position: "absolute"
  },
  backButton: {
    flex: 1,
    alignSelf: "flex-end",
    marginTop: -120,
    position: "absolute",
    opacity: 0.7
  },
  getDirections: {
    alignSelf: "flex-end",
    marginTop: 1,
    position: "absolute",
    opacity: 0.7
  },
  flex: {
    flex: 1,
    position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE * -0.5,
    marginTop: -theme.SIZES.BASE * 1,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: "#1E8CF8",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    color: "white"
  },
  directions: {
    flex: 1,
    position: "absolute",
    alignSelf: "flex-end",
    marginTop: 70,
    paddingHorizontal: 25
  },
  title: {
    textShadowRadius: 10,
    textShadowColor: "black",
    paddingTop: 100,
    position: "absolute",
    fontWeight: "bold"
  },
  cameraIcon: {
    flex: 1,
    position: "absolute",
    marginTop: -120,
    alignSelf: "flex-start"
  }
});

const mapStateToProps = ({ bathrooms, reviews, user }) => ({
  bathrooms,
  reviews,
  user
});

const mapDispatchToProps = dispatch => {
  return {
    loadReviews(id) {
      dispatch(loadReviews(id));
    },
    loadImages(id) {
      dispatch(loadReviews(id));
    },
    addImage(refugeId, url) {
      dispatch(addImage(refugeId, url));
    },
    postCheckin(checkin) {
      dispatch(createCheckin(checkin));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BathroomView);
