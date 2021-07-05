import * as React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTab';
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
        <RootStack.Navigator>
            <RootStack.Screen  name="Root" component={BottomTabNavigator}/>
        </RootStack.Navigator>

    )
}