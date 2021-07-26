import React, { StrictMode, useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, Button, TextInput } from "react-native";
import { Formik } from 'formik';
import axios from "axios"
import { useSelector, useDispatch } from "react-redux";
import { setDestinationLocation } from "../redux/actions/actionsList";
import Constants from "expo-constants";

const routingKey = Constants.manifest?.extra?.OSRMTOKEN;
const _screen = Dimensions.get("screen");

export default function DirectionScreen() {
    const destinationInputRef = useRef<TextInput | null>();
    const inputDestination = useSelector<RootState, DestinationState>(
        (state) => state.destinationState
    );
    const userLocationState = useSelector<RootState, UserLocationState>(
        (state) => state.userLocationState
    );
    const dispatch = useDispatch();

    // Fetches the destination when input in the appropriate field.
    const fetchDestination = async (input: string | undefined) => {
        // Call to nominatim API to get the address accordind to input.
        const destination = await axios({
            method: "GET",
            url: `https://nominatim.openstreetmap.org/search.php?city=${input?.toLowerCase()}&country=Japan&format=jsonv2`,
        });

        dispatch(setDestinationLocation({
            lat: Number(destination.data[0].lat),
            lng: Number(destination.data[0].lon)
        }, input?.toLocaleLowerCase()));
    }

    // Gets the direction to the destination avoiding noisy roads.
    const getDirection = async () => {
        try {
             await axios({
                method: "GET",
                url: `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${routingKey}
                &start=${userLocationState.location.lng},${userLocationState.location.lat}
                &end=${inputDestination.location?.lng},${inputDestination.location?.lat}`
            });
        } catch (error) {
            console.log(error, "Error when drawing the itinerary.")
        }

    }

    React.useEffect(() => {
        getDirection()
        console.log(routingKey, userLocationState.location, inputDestination.location)
    })

    return (
        <Formik
            initialValues={{ destination: inputDestination.nameEn }}
            onSubmit={value => fetchDestination(value.destination)}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.container}>
                    <TextInput
                        style={styles.inputContainer}
                        onChangeText={handleChange('destination')}
                        onBlur={handleBlur('destination')}
                        value={values.destination}
                    />
                    <View style={styles.submitButton}>
                        <Button onPress={() => handleSubmit()} title="Submit" />
                        <Button onPress={() => getDirection()} title="Submit" />
                    </View>
                </View>
            )}
        </Formik>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },

    inputContainer: {
        backgroundColor: "white",
        borderRadius: 25,
        width: _screen.width * 0.6,
        height: _screen.height * 0.03,
    },

    submitButton: {
        backgroundColor: "white",
        borderRadius: 10,
    }
})