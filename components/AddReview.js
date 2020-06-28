import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  Button,
  Modal
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import { Images, materialTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { connect } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
import StarRating from "react-native-star-rating";
import { createReview } from "../store/reviews";
import user from "../store/user";
import { checkins } from "../store/checkins";
import { SliderBox } from "react-native-image-slider-box";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const AddReview = ({ bathroom, backButton, user, postReview, checkins }) => {
  const [comments, setComments] = useState("");
  const [starCount, setStarCount] = useState(0);
  //   const { postReview } = props;
  const checkinArray = checkins.filter(
    checkin => checkin.userId === user.id && checkin.bathroomId === bathroom.id
  );
  const checkin = checkinArray[checkinArray.length - 1];
  return (
    <Block flex style={styles.profile}>
      <Block flex>
        
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
            <Text color="white" size={28} style={{ paddingBottom: 36 }}>
              {bathroom.establishment}{" "}
            </Text>
            <Block row space="between">
              <Block row>
                <Block middle style={styles.pro}>
                  <Text size={16} color="black">
                    Pro
                  </Text>
                </Block>
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={starCount}
            selectedStar={rating => setStarCount(rating)}
          />
          <TextInput
            value={comments}
            onChange={event => setComments(event.nativeEvent.text)}
            placeholder="comments"
          ></TextInput>
          <Button
            disabled={!starCount || !comments}
            title="Post Review"
            onPress={async () => {
              await postReview({
                rating: starCount,
                comments,
                userId: user.id,
                bathroomId: bathroom.id,
                checkinId: checkin.id
              });
              backButton();
            }}
          ></Button>
        </ScrollView>
      </Block>
    </Block>
  );
};

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
  pro: {
    backgroundColor: materialTheme.COLORS.ACTIVE,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38
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

const mapStateToProps = ({ user, checkins }) => {
  return { user, checkins };
};

const mapDispatchToProps = dispatch => {
  return {
    postReview(review) {
      dispatch(createReview(review));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
