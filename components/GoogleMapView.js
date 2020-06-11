import React, { Component } from "react";
import { StyleSheet, Dimensions, View, Text, Slider } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import seedArray from "../assets/initialSeed";
import Carousel from "react-native-snap-carousel";
import { getDistance } from "geolib";
import * as Location from "expo-location";

export default class GoogleMapView extends Component {
  constructor() {
    super();
    this.state = {
      region: null,
      location: null,
      markers: [],
      radius: 1000,
      restrooms: [],
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
      this.setState({ errorMsg: "Permission denied" });
      this.setState({
        region: {
          latitude: 40.7061,
          longitude: -73.9969,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      });
    } else {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });

      // USER'S LOCATION

      this.setState({
        region: {
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      });
    }

    const restrooms = await seedArray.filter(
      (marker) =>
        getDistance(
          { latitude: marker.latitude, longitude: marker.longitude },
          {
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
          }
        ) < this.state.radius
    );
    this.setState({ restrooms });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.region !== this.state.region && prevState.region !== null) ||
      prevState.radius !== this.state.radius
    ) {
      const restrooms = await seedArray.filter(
        (marker) =>
          getDistance(
            { latitude: marker.latitude, longitude: marker.longitude },
            {
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude,
            }
          ) < this.state.radius
      );
      this.setState({ restrooms });
    }
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

  async getRestrooms() {
    const newRadius = await event.target.value;
    this.setState({ radius: newRadius });
  }

  render() {
    if (!this.state.region) return <Text>Loading...</Text>;
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={(map) => (this._map = map)}
          style={styles.mapStyle}
          region={this.state.region}
          showsUserLocation={true}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
          {this.state.restrooms.map((marker, index) => (
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
          <Circle center={this.state.region} radius={this.state.radius} />
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
              ) < this.state.radius
          )}
          containerCustomStyle={styles.carousel}
          renderItem={this.renderCarouselItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={300}
          removeClippedSubviews={false}
          onSnapToItem={(index) => this.onCarouselItemChange(index)}
        />
        <Slider
          value={this.state.radius}
          maximumValue={2000}
          minimumValue={200}
          step={200}
          onValueChange={(value) => this.setState({ radius: value })}
        >
          <Text>{this.state.radius} meters</Text>
        </Slider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
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
