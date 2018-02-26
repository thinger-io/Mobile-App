//@flow

import * as React from "react";
import { SEPARATOR_PADDING } from "../../constants/ThingerStyles";
import styles from "../../constants/ThingerStyles";
import { Text, View } from "react-native";

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
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={[isSimple ? styles.h1 : styles.h2, { flex: 1 }]}
        >
          {id}
        </Text>
        {children}
      </View>
    );
  }
}
