import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import Navigation from "./src/navigation/RootNav";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Navigation />
    </View>
  );
}

// Accesses redux at the root.
export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
});
