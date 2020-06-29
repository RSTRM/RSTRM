import React from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Icon } from "react-native-elements";
import * as MediaLibrary from "expo-media-library";

let picture;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.backButton = this.backButton.bind(this);
  }
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
    imgURI:
      "assets-library://asset/asset.JPG?id=46F60C34-0D97-4691-928D-ABDE79C44782&ext=JPG",
    modal2Visible: false
  };

  async componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    // Camera roll Permission
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === "granted" });
  };
  backButton = () => {
    this.setState({ modal2Visible: false });
  };

  handleCameraType = () => {
    const { cameraType } = this.state;

    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };

  takePicture = async () => {
    if (this.camera) {
      const backButton = this.props.backButton;
      const { uri } = await this.camera.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(uri);
      console.log(asset, 'asset');
      this.setState({ imgURI: asset.uri });
      this.props.bathroomImage(asset);
      backButton();
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });
    this.setState({ imgURI: result.uri });
    this.props.bathroomImage(this.state.imgURI);
    const backButton = this.props.backButton;
    backButton();
  };
  

  render() {
    const { hasPermission, pictures } = this.state;
    const backButton = this.props.backButton;

    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.cameraType}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 30
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent"
                }}
                onPress={() => this.pickImage()}
              >
                <Ionicons
                  name="ios-photos"
                  style={{ color: "#fff", fontSize: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent"
                }}
                onPress={() => this.takePicture()}
              >
                <FontAwesome
                  name="camera"
                  style={{ color: "#fff", fontSize: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent"
                }}
                onPress={() => this.handleCameraType()}
              >
                <MaterialCommunityIcons
                  name="camera-switch"
                  style={{ color: "#fff", fontSize: 40 }}
                />
              </TouchableOpacity>
            </View>
          </Camera>
          <View style={styles.backButton}>
            <Icon
              reverse
              name="close"
              type="material"
              color="black"
              onPress={() => backButton()}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  backButton: {
    alignSelf: "flex-end",
    marginTop: 40,
    position: "absolute",
    opacity: 0.7
  }
});
