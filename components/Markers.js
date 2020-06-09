import React from "react";
import { View } from "react-native";
import { Marker } from "react-native-maps";
import seedArray from "../assets/initialSeed";


export default function Markers() {
    return (
        <View>
            {seedArray.map((marker, i) => (
                <Marker 
                  key={i}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={marker.name}
                  description={`Go: ${marker.directions}\nTip: ${marker.comment}`}
                  //onCalloutPress=
                />
            ))}
        </View>
    )
}

