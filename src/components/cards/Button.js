import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export default class CardButton extends React.Component {
  render() {
    const { onClick, isLoading, text, icon } = this.props;

    return isLoading ? (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#000000" />
      </View>
    ) : (
      <TouchableOpacity
        style={styles.container}
        onPress={onClick}
        activeOpacity={isLoading === undefined ? 0.2 : 1}
      >
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Icon name={icon} size={16} style={{ color: "black" }}/>
          <Text
            style={{
              marginLeft: 5,
              fontSize: 18
            }}
          >
            {text}
          </Text>
        </View>
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
