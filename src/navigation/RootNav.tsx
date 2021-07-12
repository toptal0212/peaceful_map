import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTab';
import DirectionScreen from "../screens/DirectionScreen"
import { NavigationContainer } from '@react-navigation/native'

const RootStack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
    return (
        <NavigationContainer
            fallback={<Text>Loading...🛠</Text>}
        >
            <RootNavigator />
        </NavigationContainer>
    )
}

function RootNavigator() {
    return (
        <RootStack.Navigator mode="modal">
            <RootStack.Screen  
            name="Root" 
            component={BottomTabNavigator} 
            options={{headerShown: false}}/>

            <RootStack.Screen  
            name="Direction" 
            component={DirectionScreen} 
            options={{headerShown: false}}/>
        </RootStack.Navigator>

    )
}