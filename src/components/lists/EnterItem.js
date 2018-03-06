//@flow

import React from "react";
import ItemList from "./ItemList";
import Icon from "react-native-vector-icons/FontAwesome";
import { FONT_SIZE_P } from "../../constants/ThingerStyles";
import { DARK_BLUE } from "../../constants/ThingerColors";

type Props = {
  name: string,
  onPress: () => any
};

export default class EnterItem extends React.Component<Props> {
  render() {
    return (
      <ItemList
        name={this.props.name}
        value={
          <Icon
            name="arrow-right"
            size={FONT_SIZE_P}
            style={{ color: DARK_BLUE, alignSelf: "flex-end" }}
          />
        }
        onPress={this.props.onPress}
      />
    );
  }
}
