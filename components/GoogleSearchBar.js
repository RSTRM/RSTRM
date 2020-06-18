import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";


const GoogleSearchBar = ({ onSearchRegionChange }) => {
  return (
    <GooglePlacesAutocomplete
      onFail={(error) => console.error(error)}
      placeholder="Enter Location"
      minLength={2}
      autoFocus={false}
      returnKeyType={"search"}
      listViewDisplayed="auto"
      listUnderlayColor="#c8c7cc"
      fetchDetails={true}
      renderDescription={(row) => row.description}
      styles={{
        textInputContainer: {
          backgroundColor: "rgba(0,0,0,0)",
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: "#5d5d5d",
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
      }}
      onPress={(data, details = null) => {
        let coordinates = details.geometry.location;
        onSearchRegionChange(coordinates);
      }}
      getDefaultValue={() => ""}
      query={{
        key: "AIzaSyAg3aikbYJ2TdSIyOE8ExZOmWx3xFeRHvU",
        language: "en",
        // components: "country:us",
      }}
      currentLocation={true}
      currentLocationLabel="Current location"
    />
  );
};

export default GoogleSearchBar;
