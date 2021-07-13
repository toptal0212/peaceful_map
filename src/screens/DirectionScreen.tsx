import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, Button, TextInput } from "react-native";
import { Formik } from 'formik';
import axios from "axios"
import { useSelector, useDispatch } from "react-redux";
import { setDestinationLocation } from "../redux/actions/actionsList";


const _screen = Dimensions.get("screen");

export default function DirectionScreen() {
    const markerLocationState = useSelector<RootState, DestinationLocationState>(
        (state) => state.destinationLocationState
      );
      const dispatch = useDispatch();

    const fetchDestination = async() => {
        const destination = await axios.get('https://batch.openaddresses.io/data/jp/tokyo');
        console.log('🛠',destination)
        dispatch(setDestinationLocation({lat:35.6762, lng: 139.6503}))
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
                    <Button onPress={() => fetchDestination()} title="Submit" />
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
        height: _screen.height * 0.03
    }
})