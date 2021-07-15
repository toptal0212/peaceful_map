import React, { StrictMode, useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, Button, TextInput } from "react-native";
import { Formik } from 'formik';
import axios from "axios"
import { useSelector, useDispatch } from "react-redux";
import { setDestinationLocation } from "../redux/actions/actionsList";
import { SAXParser } from "sax-ts"

const _screen = Dimensions.get("screen");

export default function DirectionScreen() {
    const markerLocationState = useSelector<RootState, DestinationLocationState>(
        (state) => state.destinationLocationState
    );
    const dispatch = useDispatch();
    const strict: boolean = true; 
    const options: {} = {}; 
    const parser = new SAXParser(strict, options);

    React.useEffect(() => {
        parser.ontext = (node: any) => {
            console.log("🦉 OpenNode: ", node)
        }
    })

    // Fetches the destination when input in the appropriate field.
    const fetchDestination = async () => {
        const destination = await axios.get('http://www.overpass-api.de/api/xapi?*[amenity=cinema][bbox=-180,-90,180,90]');
        dispatch(setDestinationLocation({ lat: 35.6762, lng: 139.6503 }))
    }

    return (
        <Formik
            initialValues={{ direction: '' }}
            onSubmit={values => console.log(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.container}>
                    <TextInput
                        style={styles.inputContainer}
                        onChangeText={handleChange('direction')}
                        onBlur={handleBlur('direction')}
                        value={values.direction}
                    />
                    <View style={styles.submitButton}>
                        <Button onPress={() => fetchDestination()} title="Submit" />
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