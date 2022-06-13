import { View, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// imported components
import CameraEntry from "./CameraEntry";
import Map from "./components/Map Comp/Map";
import ChatBot from "./components/ChatBot/ChatBot";
let Tab = createMaterialTopTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Tab.Navigator>
        <Tab.Screen name="Camera" component={CameraEntry} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="ChatBot" component={ChatBot} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
