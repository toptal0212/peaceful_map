import * as React from "react";
import { StyleSheet, Dimensions, View, Button, TextInput } from "react-native";
import { Formik } from 'formik';
import axios from "axios"
import { useSelector, useDispatch } from "react-redux";
import { setDestinationLocation } from "../redux/actions/actionsList";

const _screen = Dimensions.get("screen");

export default function DirectionScreen() {
    const inputDestination = useSelector<RootState, DestinationState>(
        (state) => state.destinationState);
    const userLocationState = useSelector<RootState, UserLocationState>(
        (state) => state.userLocationState);
    const dispatch = useDispatch();

    // Fetches the destination when input in the appropriate field.
    const fetchDestination = async (input: string | undefined) => {
        // Call to nominatim API to get the address accordind to input.
        const destination = await axios({
            method: "GET",
            url: `https://nominatim.openstreetmap.org/search.php?city=${input?.toLowerCase()}
            &country=Japan&format=jsonv2`,
        });

        dispatch(setDestinationLocation({
            lat: Number(destination.data[0].lat),
            lng: Number(destination.data[0].lon)
        }, input?.toLocaleLowerCase()));
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
                        <Button onPress={() => handleSubmit()} title="Submit" />
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