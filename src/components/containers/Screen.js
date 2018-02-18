import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import NavigationBar from "../navigation/NavigationBar";
import PropTypes from "prop-types";

export default class Screen extends React.Component {
  propsType = {
    navigationBar: PropTypes.shape({
      title: PropTypes.string.isRequired,
      rightIcon: PropTypes.string,
      onPress: PropTypes.func
    })
  };

  render() {
    const { navigationBar } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {navigationBar && (
          <NavigationBar
            title={navigationBar.title}
            rightIcon={navigationBar.rightIcon}
            onPress={navigationBar.onPress}
          />
        )}
        <View style={styles.container}>{this.props.children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
