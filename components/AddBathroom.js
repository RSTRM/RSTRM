import React, { Component, PureComponent } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  Button,
  View,
  TextInput,
  Modal,
} from "react-native";

import { Block, Text, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import { Images, materialTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { connect } from "react-redux";
import { loadReviews } from "../store/reviews";
import { createBathroom } from "../store/bathrooms";
import headerimg from "../assets/header-img.png";
import AddReview from "./AddReview";
import GoogleSearchBar from "./GoogleSearchBar";
import { white } from "color-name";
import Cam from "./Cam";
import { SliderBox } from "react-native-image-slider-box";
import * as MediaLibrary from "expo-media-library";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

class AddBathroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refugeId: Math.ceil(Math.random() * 140089000),
      unisex: true,
      accessible: true,
      changingTable: true,
      directions: "go to the back",
      AvgRating: 1,
      checkinCount: 1,
      establishment: " ",
      street: "",
      city: " ",
      state: " ",
      country: "USA",
      latitude: this.props.region.latitude || 0.0,
      longitude: this.props.region.longitude || 0.0,
      website: " ",
      modal2Visible: false,
      imgURI: "_",
    };
    this.getLocationData = this.getLocationData.bind(this);
    this.onSearchRegionChange = this.onSearchRegionChange.bind(this);
  }
  async componentDidMount() {
    this.setState({
      latitude: this.props.region.latitude,
      longitude: this.props.region.longitude,
    });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
    }
  }
  backButton = () => {
    this.setState({ modal2Visible: false });
  };
  bathroomImage = (pic) => {
    this.setState({ imgURI: pic });
  };
  getLocationData(data) {
    const firstWord = data.structured_formatting.main_text.split(" ");
    this.setState({
      unisex: true,
      accessible: true,
      changingTable: true,
      AvgRating: 1,
      checkinCount: 1,
      establishment: data.structured_formatting.main_text,
      street: data.terms[1].value || "_",
      city: data.terms[2].value || "_",
      website: `www.${firstWord[0]}.com` || " ",
    });
    console.log(this.state, "updated state");
  }
  onSearchRegionChange(coordinates) {
    this.setState({
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    });
  }

  render() {
    const backButton = this.props.backButton;
    const region = this.props.region;

    const {
      refugeId,
      unisex,
      accessible,
      changingTable,
      directions,
      AvgRating,
      checkinCount,
      establishment,
      street,
      city,
      state,
      country,
      latitude,
      longitude,
      website,
    } = this.state;
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <SliderBox
            images={[this.state.imgURI]}
            style={styles.profileContainer}
            sliderBoxHeight={100}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
          />
          <Text size={24} color="white" style={styles.title}>
            Add Bathroom
          </Text>

          <Block flex style={styles.profileDetails}>
            <Block style={styles.profileTexts}>
              <Block style={styles.backButton}>
                <Icon
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
                    this.setState({ modal2Visible: true });
                  }}
                />
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modal2Visible}
                  on
                >
                  <Cam
                    backButton={this.backButton}
                    bathroomImage={this.bathroomImage}
                  />
                </Modal>
              </Block>
            </Block>
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
              style={styles.gradient}
            />
          </Block>
        </Block>

        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block
              row
              space="between"
              style={{ padding: theme.SIZES.BASE }}
            ></Block>
            <Block
              row
              space="between"
              style={{ paddingVertical: 16, alignItems: "baseline" }}
            ></Block>
            <Text style={styles.text}>Establishment Name</Text>
            <TextInput
              value={establishment}
              onChange={(event) =>
                this.setState({ establishment: event.nativeEvent.text })
              }
              style={styles.textInput}
              placeholder="Establishment Name"
              autoCapitalize="none"
            ></TextInput>
            <Text style={styles.text}>Directions</Text>
            <TextInput
              value={directions}
              onChange={(event) =>
                this.setState({ directions: event.nativeEvent.text })
              }
              style={styles.textInput}
              placeholder="Website"
              autoCapitalize="none"
            ></TextInput>
            <Text style={styles.text}>Website</Text>
            <TextInput
              value={website}
              onChange={(event) =>
                this.setState({ website: event.nativeEvent.text })
              }
              style={styles.textInput}
              placeholder="Website"
              autoCapitalize="none"
            ></TextInput>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              locations={[0.2, 1]}
              style={styles.gradient}
              colors={[
                materialTheme.COLORS.GRADIENT_START,
                materialTheme.COLORS.GRADIENT_END,
              ]}
            >
              <Button
                title="Submit"
                style={styles.text}
                color="white"
                disabled={!establishment}
                onPress={() => {
                  this.props.createBathroom({
                    refugeId,
                    unisex,
                    accessible,
                    changingTable,
                    directions,
                    AvgRating,
                    checkinCount,
                    establishment,
                    street,
                    city,
                    state,
                    country,
                    latitude,
                    longitude,
                    website,
                  });
                  backButton();
                }}
              ></Button>
            </LinearGradient>
          </ScrollView>

          <View style={styles.searchBar}>
            <Text style={styles.text}>Google Search for Bathroom</Text>
            <GoogleSearchBar
              getLocationData={this.getLocationData}
              onSearchRegionChange={this.onSearchRegionChange}
            />
          </View>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 13,
  },
  profileImage: {
    width: width * 1.1,
    height: "auto",
  },
  profileContainer: {
    width: width,
    height: height / 1.8,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: "flex-end",
    position: "relative",
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2,
  },
  options: {
    position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 43,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: "#0077F6",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  gradient: {
    flex: 1,
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: "20%",
    marginBottom: -80,
    position: "absolute",
    borderRadius: theme.SIZES.BASE * 1,
  },
  backButton: {
    alignSelf: "flex-end",
    marginTop: -700,
    position: "absolute",
    opacity: 0.7,
  },
  searchBar: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    width: "85%",
    marginTop: 0,
  },
  textInput: {
    height: 40,
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 5,
    alignSelf: "center",
  },
  text: {
    alignSelf: "center",
    position: "relative",
    marginTop: 10,
    color: "white",
  },
  flex: {
    flex: 1,
    position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE * -0.5,
    marginTop: -theme.SIZES.BASE * 1,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: "#005DFF",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    color: "white",
  },
  cameraIcon: {
    flex: 1,
    position: "absolute",
    marginTop: -700,
    alignSelf: "flex-start",
  },
  title: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    marginTop: 100,
    fontSize: 26,
    padding: 6,
    textShadowRadius: 10,
    textShadowColor: "black",
    color: "white",
    fontWeight: "bold",
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    createBathroom(bathroom) {
      dispatch(createBathroom(bathroom));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddBathroom);
