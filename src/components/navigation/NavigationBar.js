//@flow

import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { FONT_SIZE_H1, PADDING } from "../../constants/ThingerStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { DARK_BLUE } from "../../constants/ThingerColors";
import type { Dispatch } from "../../types/Dispatch";
import { goBack } from "../../actions/nav";

type Props = {
  title: string,
  main?: boolean,
  button?: {
    icon: string,
    onPress: () => any
  },
  dispatch: Dispatch
};

class NavigationBar extends React.Component<Props> {
  render() {
    const { title, button, main = false, dispatch } = this.props;

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {!main && (
            <TouchableOpacity onPress={() => dispatch(goBack())}>
              <Icon
                name="chevron-left"
                size={FONT_SIZE_H1}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          {button && (
            <TouchableOpacity onPress={button.onPress}>
              <Icon
                name={button.icon}
                size={FONT_SIZE_H1}
                style={styles.icon}
              />
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
    paddingTop: Platform.OS === "ios" ? PADDING + 10 : PADDING + 20,
    alignItems: "center",
    backgroundColor: DARK_BLUE
  },
  icon: {
    color: "white"
  },
  title: {
    fontSize: FONT_SIZE_H1,
    color: "white",
    flex: 4,
    textAlign: "center"
  }
});
