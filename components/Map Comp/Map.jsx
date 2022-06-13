import React, { useState } from "react";
import { View, StatusBar, StyleSheet, Dimensions, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useIsFocused } from "@react-navigation/native";
import { data } from "./markerData";

const Map = () => {
  let isFocused = useIsFocused();
  let [curloc, setCurloc] = useState({
    latitude: -15.78626,
    longitude: 35.00953,
    latitudeDelta: 6.0922,
    longitudeDelta: 6.0421,
  });
  return (
    <View style={styles.mapContainer}>
      <StatusBar />
      {isFocused && (
        <MapView style={styles.map} initialRegion={curloc}>
          {data.map((val, i) => {
            return (
              <Marker
                coordinate={val.cords}
                title={val.title}
                description={val.description}
              />
            );
          })}
        </MapView>
      )}
    </View>
  );
};

let styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;
