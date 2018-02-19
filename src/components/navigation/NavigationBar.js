import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { FONT_SIZE_H1, MARGIN, PADDING } from "../../constants/ThingerStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { goBack } from "../../actions/actions";
import { DARK_BLUE } from "../../constants/ThingerColors";

class NavigationBar extends React.Component {
  propsType = {
    title: PropTypes.string.isRequired,
    rightIcon: PropTypes.string,
    onPress: PropTypes.func,
    isMain: PropTypes.bool
  };

  render() {
    const { title, dispatch, rightIcon, onPress, isMain = true } = this.props;

    return (
      <View style={styles.container}>
        <View>
          {isMain && (
            <TouchableOpacity onPress={() => dispatch(goBack())}>
              <Icon name="arrow-left" size={FONT_SIZE_H1} style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.title}>{title}</Text>
        <View>
          {rightIcon && (
            <TouchableOpacity onPress={onPress}>
              <Icon name={rightIcon} size={FONT_SIZE_H1} style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

export default connect()(NavigationBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: PADDING,
    paddingTop: PADDING + 10,
    alignItems: "center",
    backgroundColor: DARK_BLUE
  },
  icon: {
    color: "white"
  },
  title: {
    fontSize: FONT_SIZE_H1,
    color: "white"
  }
});
