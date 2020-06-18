import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Slider,
  Modal
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  Callout
} from "react-native-maps";
import Carousel from "react-native-snap-carousel";
import * as Location from "expo-location";
import BathroomView from "./BathroomView";
import { loadBathrooms } from "../store/bathrooms";
import { connect } from "react-redux";
import { Container, Header, Left, Button, Icon } from 'native-base';
import GoogleSearchBar from "./GoogleSearchBar";


class GoogleMapView extends Component {
  constructor() {
    super();
    this.state = {
      region: null,
      location: null,
      markers: [],
      radius: 1000,
      errorMsg: null,
      modalVisible: false,
      idx: 0
    };
    this.onSearchRegionChange = this.onSearchRegionChange.bind(this);
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    // this.renderCarouselItem = this.renderCarouselItem.bind(this);
    // this.onCarouselItemChange = this.onCarouselItemChange.bind(this);
    // this.onMarkerPressed = this.onMarkerPressed.bind(this);
    // this.backButton = this.backButton.bind(this);
  }

  async componentDidMount() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      this.setState({ errorMsg: "Permission denied" });
      this.setState({
        region: {
          latitude: 40.7061,
          longitude: -73.9969,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
      });
    } else {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
      this.setState({
        region: {
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
      });
    }
    await this.props.load(this.state.region, this.state.radius);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.region !== this.state.region && prevState.region !== null) ||
      prevState.radius !== this.state.radius
    ) {
      await this.props.load(this.state.region, this.state.radius);
    }
  }

  onRegionChangeComplete(event) {
    this.setState({
      region: {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    });
  }

  onSearchRegionChange(coordinates) {
    this.setState({
      region: {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    });

    this._map.animateToRegion({
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    });
  }

  onCarouselItemChange = index => {
    let location = this.props.bathrooms[index];
    this.setState({ idx: index });
    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    });

    this.state.markers[index].showCallout();
  };

  onMarkerPressed = (location, index) => {
    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    });

    this._carousel.snapToItem(index);
  };

  backButton = () => {
    this.setState({ modalVisible: false });
  };

  renderCarouselItem = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <Text
          style={styles.cardTitle}
          onPress={() => this.setState({ modalVisible: true })}
        >
          {item.establishment}
        </Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          on
        >
          <BathroomView
            backButton={this.backButton}
            bathroom={item}
            index={this.state.idx}
          />
        </Modal>
      </View>
    );
  };

  async getRestrooms() {
    const newRadius = await event.target.value;
    this.setState({ radius: newRadius });
  }

  render() {
    if (!this.state.region || !this.props.bathrooms.length)
      return <Text>Loading...</Text>;
    return (
      <View style={styles.container}>
        <Container style={styles.header}>
          <Header>
            <Left>
              <Button transparent>
                <Icon name='ios-menu' onPress={()=> this.props.navigation.openDrawer()}/>
              </Button>
            </Left>
          </Header>
        </Container>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={map => (this._map = map)}
          style={styles.mapStyle}
          initialRegion={this.state.region}
          showsUserLocation={true}
        >
          <Marker
            pinColor="blue"
            draggable
            onDragEnd={this.onRegionChangeComplete}
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude
            }}
          />
          {this.props.bathrooms.map((marker, index) => (
            <Marker
              key={index}
              ref={ref => (this.state.markers[index] = ref)}
              onPress={() => this.onMarkerPressed(marker, index)}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
            >
              <Callout
                style={styles.callout}
                onPress={() => this.setState({ modalVisible: true })}
              >
                <Text>{marker.establishment}</Text>
                <Text>{`Go: ${marker.directions}\nTip: ${marker.comment}`}</Text>
              </Callout>
            </Marker>
          ))}
          <Circle center={this.state.region} radius={this.state.radius + 500} />
        </MapView>
        <View style={styles.searchBar}>
          <GoogleSearchBar onSearchRegionChange={this.onSearchRegionChange} />
        </View>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.props.bathrooms}
          containerCustomStyle={styles.carousel}
          renderItem={this.renderCarouselItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={300}
          removeClippedSubviews={false}
          onSnapToItem={index => this.onCarouselItemChange(index)}
        />
        <Slider
          style={styles.slider}
          value={this.state.radius}
          maximumValue={2000}
          minimumValue={200}
          step={100}
          onValueChange={value => this.setState({ radius: value })}
        >
          <Text>{this.state.radius} meters</Text>
        </Slider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject
  },
  header: {
    position: 'absolute',
    top: 10
  },
  carousel: {
    position: "absolute",
    bottom: 0,
    marginBottom: 70
  },
  cardContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    height: 50,
    width: 300,
    padding: 10,
    borderRadius: 10
  },
  cardTitle: {
    color: "white",
    fontSize: 20,
    alignSelf: "center"
  },
  permissions: {
    marginTop: 10,
    color: "red"
  },
  slider: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    bottom: 15,
    width: "85%"
  },
  searchBar: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    width: "85%",
    marginTop: 30
  }
});

const mapStateToProps = ({ bathrooms }) => ({ bathrooms });

const mapDispatchToProps = dispatch => {
  return {
    load(region, radius) {
      dispatch(loadBathrooms(region, radius));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMapView);
