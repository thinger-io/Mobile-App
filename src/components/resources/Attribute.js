//@flow

import * as React from "react";
import { SEPARATOR_PADDING } from "../../constants/ThingerStyles";
import styles from "../../constants/ThingerStyles";
import { Text, View } from "react-native";
import H1Text from "../texts/H1";
import H2Text from "../texts/H2";

type Props = {
  id: string,
  isSimple?: boolean,
  children: React.Node
};

export default class AttributeView extends React.Component<Props> {
  render() {
    const { id, isSimple, children } = this.props;

    return (
      <View
        style={{
          paddingVertical: SEPARATOR_PADDING,
          flexDirection: "row"
        }}
      >
        {isSimple ? (
          <H1Text ellipsizeMode="tail" numberOfLines={1} style={{ flex: 1 }}>
            {id}
          </H1Text>
        ) : (
          <H2Text ellipsizeMode="tail" numberOfLines={1} style={{ flex: 1 }}>
            {id}
          </H2Text>
        )}

        {children}
      </View>
    );
  }
}
