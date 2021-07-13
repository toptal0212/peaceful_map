import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, Text, Alert, SafeAreaView } from "react-native";
import Constants from "expo-constants"
import { WebView } from "react-native-webview"
import { WebViewLeaflet, WebviewLeafletMessage, WebViewLeafletEvents, AnimationType, MapShapeType } from "react-native-webview-leaflet";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import { setDestinationLocation } from "../redux/actions/actionsList";
import DirectionInputField from "../screens/DirectionScreen";

export default function MapComponent() {
  const webViewLeafletRef = useRef<WebViewLeaflet>();
  const markerLocationState = useSelector<RootState, DestinationLocationState>(
    (state) => state.destinationLocationState
  );
  const dispatch = useDispatch();
  console.log(markerLocationState)

  // Receives information about the map in the form of object.
  const onMessageReceived = (message: WebviewLeafletMessage) => {
    switch (message.event) {
      case WebViewLeafletEvents.ON_MAP_MARKER_CLICKED:
        Alert.alert(
          `Map Marker Touched, ID: ${message.payload?.mapMarkerID || "unknown"}`
        );

        break;
      case WebViewLeafletEvents.ON_MAP_TOUCHED:
        const position: LatLngObject = message.payload!
          .touchLatLng as LatLngObject;
        // Alert.alert(`Map Touched at:`, `${position.lat}, ${position.lng}`);
        dispatch(setDestinationLocation({ lat: position.lat, lng: position.lng }));
        console.log(markerLocationState)
        break;
      default:
        console.log("App received", message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.directionInputField}>
        <DirectionInputField />
      </View>
      <WebViewLeaflet
        ref={(ref: WebViewLeaflet) => {
          webViewLeafletRef.current = ref;
        }}
        backgroundColor={"purple"}
        onMessageReceived={onMessageReceived}
        mapLayers={[
          {
            baseLayerIsChecked: true,
            baseLayerName: "OpenStreetMap",
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution:
              "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          },
          {
            baseLayerName: "Mapbox",
            url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${Constants.manifest?.extra.MAPBOXTOKEN}`,
          }
        ]}
        mapCenterPosition={{ lat: 35.6762, lng: 139.6503 }}
        zoom={10}
        ownPositionMarker={{
          id: "1",
          position: markerLocationState.destinationLocation,
          icon: "📍",
          size: [24, 24],
          animation: {
            type: AnimationType.FADE,
            duration: .5,
            delay: 0,
          }
        }}

        mapShapes={[
          {
            shapeType: MapShapeType.CIRCLE,
            color: "#123123",
            id: "1",
            center: markerLocationState.destinationLocation,
            radius: 2000
          }
        ]}
        onError={() => { return <Text>An error occured when loading the map.😵</Text> }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  directionInputField: {
    zIndex: 1,
  }
});