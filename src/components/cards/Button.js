import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import React from "react";

export default class CardButton extends React.Component {
  render() {
    const { color, onClick, isLoading, text } = this.props;

    return isLoading ? (
      <View style={[styles.container, { backgroundColor: color }]}>
        <ActivityIndicator size="small" color="#ffffff" />
      </View>
    ) : (
      <TouchableOpacity
        style={[styles.container, { backgroundColor: color }]}
        onPress={onClick}
        activeOpacity={isLoading === undefined ? 0.2 : 1}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  }
});
