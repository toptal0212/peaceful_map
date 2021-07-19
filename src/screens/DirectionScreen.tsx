import React, { StrictMode, useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, Button, TextInput } from "react-native";
import { Formik } from 'formik';
import axios from "axios"
import { useSelector, useDispatch } from "react-redux";
import { setDestinationLocation } from "../redux/actions/actionsList";

const _screen = Dimensions.get("screen");

export default function DirectionScreen() {
    const destinationInputRef = useRef<TextInput | null>();
    const inputDestination = useSelector<RootState, DestinationState>(
        (state) => state.destinationState
    );
    const dispatch = useDispatch();

    // Fetches the destination when input in the appropriate field.
    const fetchDestination = async (input: string | undefined) => {
        const destination = await axios({
            method: "GET",
            url: `https://nominatim.openstreetmap.org/search.php?city=${input?.toLowerCase()}&country=Japan&format=jsonv2`,
        });
        const destinationName = destination.data[0].display_name.split(",")[0].toLowerCase();
        console.log(destinationName);
        dispatch(setDestinationLocation({ lat: destination.data[0].lat, lng: destination.data[0].lon }, input?.toLocaleLowerCase()));
    }

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
                        <Button onPress={() =>handleSubmit()} title="Submit" />
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