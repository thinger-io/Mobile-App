//@flow

import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import React from "react";

type Props = {
  onClick: () => any,
  isLoading?: boolean,
  text: string,
  color: string
};

export default class CardButton extends React.Component<Props> {
  render() {
    const { onClick, isLoading, text, color } = this.props;

    return (
      <TouchableOpacity
        style={[styles.container, { backgroundColor: color }]}
        onPress={onClick}
        activeOpacity={0.6}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#000000" />
        ) : (
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                marginLeft: 5,
                fontSize: 18
              }}
            >
              {text}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    height: 38,
    alignItems: "center"
  }
});
