//@flow

import * as React from "react";
import { SEPARATOR_PADDING } from "../../constants/ThingerStyles";
import { View } from "react-native";
import H1Text from "../texts/H1";
import PText from "../texts/P";

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
          <PText ellipsizeMode="tail" numberOfLines={1} style={{ flex: 1 }}>
            {id}
          </PText>
        )}

        {children}
      </View>
    );
  }
}
