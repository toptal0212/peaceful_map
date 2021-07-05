import * as React from 'react';
import { forModalPresentationIOS } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapComponent from "../components/MapComponent";
import SavedItinerary from '../components/SavedItinerary';


const BottomTab = createBottomTabNavigator<BottomParamList>();

export default function BottomTabNavigator() {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen
                name="Map"
                component={MapComponent}
            />
            <BottomTab.Screen
                name="SavedItinerary"
                component={SavedItinerary}
            />
        </BottomTab.Navigator>
    )
}