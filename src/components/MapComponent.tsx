import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, Text, Alert, SafeAreaView } from "react-native";
import Constants from "expo-constants"
import { WebView } from "react-native-webview"
import { WebViewLeaflet, WebviewLeafletMessage, WebViewLeafletEvents, AnimationType, MapShapeType } from "react-native-webview-leaflet";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import { setDestinationLocation } from "../redux/actions/actionsList";
import DirectionInputField from "../screens/DirectionScreen";
import MapView, { Marker, UrlTile } from 'react-native-maps';

const _screen = Dimensions.get("screen");

export default function MapComponent() {
  const webViewLeafletRef = useRef<WebViewLeaflet>();
  const markerLocationState = useSelector<RootState, DestinationState>(
    (state) => state.destinationState
  );
  const dispatch = useDispatch();

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
          zoom: 0,
          altitude: 0
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomEnabled={true}>
        <UrlTile
          urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
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