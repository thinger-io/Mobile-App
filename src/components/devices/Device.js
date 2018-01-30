import React from "react";
import { TouchableHighlight, Text, View, StyleSheet } from "react-native";
import { getColorByIndex } from "../../utils/colors";

const Device = ({ device, onClick, index }) => (
  <TouchableHighlight onPress={() => onClick(device)}>
    <View style={[styles.card, { backgroundColor: getColorByIndex(index) }]}>
      <Text style={styles.title}>{device.dev}</Text>
      <Text style={styles.subtitle}>{device.usr}</Text>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  card: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: 24
  },
  subtitle: {
    fontWeight: "200",
    fontSize: 20
  }
});

export default Device;
