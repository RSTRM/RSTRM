import React, { Component } from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import seedArray from "../assets/initialSeed";
import Carousel from "react-native-snap-carousel";
import { getDistance } from "geolib";
import * as Location from "expo-location";

export default class GoogleMapView extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 40.7061,
        longitude: -73.9969,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      location: null,
      markers: [],
      errorMsg: null,
    };
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.renderCarouselItem = this.renderCarouselItem.bind(this);
    this.onCarouselItemChange = this.onCarouselItemChange.bind(this);
    this.onMarkerPressed = this.onMarkerPressed.bind(this);
  }

  async componentDidMount() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      this.setState({ errorMsg: "Please turn on your GPS" });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  }

  onRegionChangeComplete(region) {
    this.setState({ region });
  }

  onCarouselItemChange = (index) => {
    let location = seedArray[index];

    // this._map.animateToRegion({
    //   latitude: location.latitude,
    //   longitude: location.longitude,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // });

    this.state.markers[index].showCallout();
  };

  onMarkerPressed = (location, index) => {
    // this._map.animateToRegion({
    //   latitude: location.latitude,
    //   longitude: location.longitude,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // });

    this._carousel.snapToItem(index);
  };

  renderCarouselItem = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{item.name}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={(map) => (this._map = map)}
          style={styles.mapStyle}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
          {seedArray
            .filter(
              (marker) =>
                getDistance(
                  { latitude: marker.latitude, longitude: marker.longitude },
                  {
                    latitude: this.state.region.latitude,
                    longitude: this.state.region.longitude,
                  }
                ) < 1000
            )
            .map((marker, index) => (
              <Marker
                key={index}
                ref={(ref) => (this.state.markers[index] = ref)}
                onPress={() => this.onMarkerPressed(marker, index)}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.name}
                description={`Go: ${marker.directions}\nTip: ${marker.comment}`}
              />
            ))}
          <Circle center={this.state.region} radius={1000} />
        </MapView>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={seedArray.filter(
            (marker) =>
              getDistance(
                { latitude: marker.latitude, longitude: marker.longitude },
                {
                  latitude: this.state.region.latitude,
                  longitude: this.state.region.longitude,
                }
              ) < 1000
          )}
          containerCustomStyle={styles.carousel}
          renderItem={this.renderCarouselItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={300}
          removeClippedSubviews={false}
          onSnapToItem={(index) => this.onCarouselItemChange(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 196,
  },
  mapStyle: {
    // ...StyleSheet.absoluteFillObject,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 196,
  },
  carousel: {
    position: "absolute",
    bottom: 0,
    marginBottom: 48,
  },
  cardContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    height: 50,
    width: 300,
    padding: 10,
    borderRadius: 10,
  },
  cardTitle: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
  },
  permissions: {
    marginTop: 10,
    color: "red",
  },
});
