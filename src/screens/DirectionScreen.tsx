import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, Button, TextInput } from "react-native";
import { Formik } from 'formik';

const _screen = Dimensions.get("screen");

export default function DirectionScreen() {
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
                        <Button onPress={() => handleSubmit()} title="Submit" />
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