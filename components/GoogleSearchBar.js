import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// const navigator.geolocation = require('@react-native-community/geolocation');

const GoogleSearchBar = ({ onSearchRegionChange, getLocationData = {} }) => {
  return (
    <GooglePlacesAutocomplete
      onFail={error => console.error(error)}
      placeholder="Enter Location"
      minLength={2}
      autoFocus={false}
      returnKeyType={"search"}
      listViewDisplayed="auto"
      listUnderlayColor="#c8c7cc"
      fetchDetails={true}
      renderDescription={row => row.description}
      enableHighAccuracyLocation={true}
      styles={{
        textInputContainer: {
          backgroundColor: "rgb0,0,0)",
          borderTopWidth: 0,
          borderBottomWidth: 0
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: "#5d5d5d",
          fontSize: 16
        },
        predefinedPlacesDescription: {
          color: "#1faadb"
        },
        listView: {
          backgroundColor: "#fff",
          color: "5d5d5d"
        },
        listUnderlayColor: {
          backgroundColor: "blue",
          color: "blue"
        }
      }}
      onPress={(data, details = null) => {
        let coordinates = details.geometry.location;
        onSearchRegionChange(coordinates);
        if (getLocationData.length) {
          getLocationData(data);
        }
      }}
      getDefaultValue={() => ""}
      query={{
        key: "AIzaSyAg3aikbYJ2TdSIyOE8ExZOmWx3xFeRHvU",
        language: "en"
        // components: "country:us",
      }}
      currentLocation={false}
      currentLocationLabel="Current location"
    />
  );
};

export default GoogleSearchBar;
