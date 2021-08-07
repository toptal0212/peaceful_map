import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, SafeAreaView } from "react-native";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import { setUserLocation } from "../redux/actions/actionsList";
import DirectionInputField from "../screens/DirectionScreen";
import MapView, { Marker, UrlTile, Geojson } from 'react-native-maps';
import axios from "axios";
import Constants from "expo-constants";

const routingKey = Constants.manifest?.extra?.ORSMTOKEN;
const _screen = Dimensions.get("screen");

export default function MapComponent() {
  const [itinerary, setItinerary] = useState<any>();
  const markerLocationState = useSelector<RootState, DestinationState>(
    (state) => state.destinationState);
  const inputDestination = useSelector<RootState, DestinationState>(
    (state) => state.destinationState);
  const userLocationState = useSelector<RootState, UserLocationState>(
    (state) => state.userLocationState);
  const dispatch = useDispatch();

  // Uses expo-location to get user's current location and update it.
  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    try {
      let location = await Location.getCurrentPositionAsync();
      dispatch(setUserLocation({
        lat: Number(location.coords.latitude),
        lng: Number(location.coords.longitude),
      }));
    } catch (error) {
      console.log(error, "Error during user location. Geolocalisation status: ", status)
    }
  }

  // Gets the direction to the destination avoiding noisy roads.
  const getItinerary = async () => {
    try {
         const direction  = await axios({
            method: "GET",
            url: `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${routingKey}&start=
            ${userLocationState.location.lng},${userLocationState.location.lat}
            &end=${inputDestination.location?.lng},${inputDestination.location?.lat}`
        });

        const itinerary: Itinerary = {
          type: direction.data.type,
          features: {
            type: direction.data.features[0].type,
            properties: direction.data.features[0].properties,
            geometry: direction.data.features[0].geometry,
          }
        } 

        setItinerary(itinerary)
        console.log(itinerary?.features.geometry.coordinates, "🛠")
    } catch (error) {
        console.log(error, "Error when drawing the itinerary.")
    }
}

// FOR TEST PURPOSES.
React.useEffect(() => {
    getItinerary()
    console.log(routingKey, userLocationState.location, inputDestination.location)
}, [inputDestination])

  React.useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.directionInputField}>
        <DirectionInputField />
      </View>
      <MapView
        style={styles.map}
        camera={{
          center: {
            latitude: markerLocationState.location?.lat,
            longitude: markerLocationState.location?.lng
          },
          heading: 0,
          pitch: 0,
          zoom: 10,
          altitude: 12000,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsTraffic={false}
        zoomEnabled={true}
        zoomControlEnabled={false}>
        <UrlTile
          urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={100}
          flipY={false}
        />
        <Geojson
          strokeColor="red"
          strokeWidth={2}
          lineDashPattern={itinerary?.features.geometry.coordinates.map(
            (coordinate: number[]) => { return coordinate; })}
        />
        <Marker
          key={markerLocationState.nameEn}
          coordinate={{
            latitude: markerLocationState.location?.lat,
            longitude: markerLocationState.location?.lng
          }} />
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  directionInputField: {
    zIndex: 1,
    marginTop: _screen.height * 0.05
  }
});