import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import DirectionInputField from "../screens/DirectionScreen"


export default function SavedItinerary() {
    return (
        <SafeAreaView>
            <DirectionInputField />
            <Text>This is the SavedItinerary Page</Text>
        </SafeAreaView>
    )
}