import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, Text, Alert, SafeAreaView } from "react-native";
import { WebViewLeaflet, WebviewLeafletMessage, WebViewLeafletEvents, AnimationType, MapShapeType } from "react-native-webview-leaflet";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import { setDestinationLocation, setUserLocation } from "../redux/actions/actionsList";
import DirectionInputField from "../screens/DirectionScreen";
import MapView, { Marker, UrlTile } from 'react-native-maps';

const _screen = Dimensions.get("screen");

export default function MapComponent() {
  const webViewLeafletRef = useRef<WebViewLeaflet>();
  const markerLocationState = useSelector<RootState, DestinationState>(
    (state) => state.destinationState
  );
  const userLocationState = useSelector<RootState, UserLocationState>(
    (state) => state.userLocationState
  );
  const dispatch = useDispatch();

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

  React.useEffect(() => {
    getUserLocation();
  }, [])

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