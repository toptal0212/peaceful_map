import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, SafeAreaView } from "react-native";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import { setUserLocation } from "../redux/actions/actionsList";
import DirectionInputField from "../screens/DirectionScreen";
import MapView, { Marker, UrlTile, Geojson, Polyline, LatLng } from 'react-native-maps';
import axios from "axios";
import Constants from "expo-constants";

const routingKey = Constants.manifest?.extra?.ORSMTOKEN;
const _screen = Dimensions.get("screen");

export default function MapComponent() {

  // TODO: Local states to implement in Redux. 
  const [itinerary, setItinerary] = useState<Itinerary>();
  const [routePattern, setRoutePattern] = useState<LatLng[]>()

  const markerLocationState = useSelector<RootState, DestinationState>(
    (state) => state.destinationState);
  const inputDestination = useSelector<RootState, DestinationState>(
    (state) => state.destinationState);
  const userLocationState = useSelector<RootState, UserLocationState>(
    (state) => state.userLocationState);
  const dispatch = useDispatch();

  // Uses expo-location to get user's current location and update it.
  async function getUserLocation(): Promise<void> {
    let { status } = await Location.requestForegroundPermissionsAsync();
    try {
      let location = await Location.getCurrentPositionAsync();

      dispatch(setUserLocation({
        latitude: Number(location.coords.latitude),
        longitude: Number(location.coords.longitude),
      }));
    } catch (error) {
      console.error(error, "Error during user location. Geolocalisation status: ", status)
    }
  }

  // Gets the direction to the destination avoiding noisy roads.
  async function getItinerary(): Promise<void> {
    try {
      if (inputDestination.location?.latitude !== 0 
        && inputDestination.location?.longitude !== 0) {

        const direction = await axios({
          method: "GET",
          url: `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${routingKey}&start=
              ${userLocationState.location.longitude},${userLocationState.location.latitude}
              &end=${inputDestination.location?.longitude},${inputDestination.location?.latitude}`
        });

        const itinerary: Itinerary = {
          type: direction.data.type,
          features: [{
            type: direction.data.features[0].type,
            properties: direction.data.features[0].properties,
            geometry: direction.data.features[0].geometry,
          }]
        }

        setItinerary(itinerary)
      }

    } catch (error) {
      console.error(error, "Error when drawing the itinerary.")
    }
  }

  // Builds an array of object {latitude: number, longitude: number} to draw the route.
  function drawRoute(pathsRepertory: number[][] | undefined): void {
    let pathPattern: LatLng[] = [];

    if (pathsRepertory) {
      pathsRepertory.map((paths) => {
        pathPattern.push({
          latitude: paths[1],
          longitude: paths[0]
        })
      })
    }

    setRoutePattern(pathPattern);
  }

  React.useEffect(() => {
    getItinerary();
    console.log(routingKey, userLocationState.location, inputDestination.location)
  }, [inputDestination])

  React.useEffect(() => {
    getUserLocation();
  }, []);

  React.useEffect(() => {
    drawRoute(itinerary?.features[0].geometry?.coordinates);
  }, [itinerary]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.directionInputField}>
        <DirectionInputField />
      </View>
      <MapView
        style={styles.map}
        camera={{
          center: {
            latitude: userLocationState.location.latitude,
            longitude: userLocationState.location.longitude
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
        <Polyline
          strokeWidth={5}
          coordinates={routePattern}
          strokeColor="rgba(0,0,200,0.5)"
          strokeColors={[
            '#7F0000',
            '#00000000',
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000'
          ]}
          lineDashPattern={[35.7358426, 139.7084043]}
        />
        <Marker
          key={markerLocationState.nameEn}
          coordinate={{
            latitude: markerLocationState.location?.latitude,
            longitude: markerLocationState.location?.longitude
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