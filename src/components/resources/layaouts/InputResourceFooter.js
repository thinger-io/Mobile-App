import styles from "../styles";
import { View } from "react-native";
import React from "react";
import UpdateButton from "../buttons/Update";
import PostButton from "../buttons/Post";

export default class InputResourceFooter extends React.Component {
  render() {
    const { onUpdateClick, onPostClick } = this.props;
    return (
      <View style={styles.footer}>
        <UpdateButton onClick={onUpdateClick} />
        <PostButton onClick={onPostClick} />
      </View>
    );
  }
}
