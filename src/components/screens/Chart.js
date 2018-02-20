import React from "react";
import { connect } from "react-redux";
import Line from "../charts/Line";
import {
  selectAttribute,
  deselectAttribute,
  lockAttribute,
  unlockAttribute
} from "../../actions/actions";
import styles from "../../constants/ThingerStyles";
import { getColorByIndex } from "../../utils/colors";
import { FlatList, ScrollView, Text, View } from "react-native";
import Card from "../cards/Card";
import Label from "../Label";
import Pie from "../charts/Pie";
import Bars from "../charts/Bars";
import { BARS, LINES, PIE } from "../navigators/Charts";
import Screen from "../containers/Screen";
import {
  DARK_BLUE,
  DIVIDER_COLOR,
  LIGHT_BLUE
} from "../../constants/ThingerColors";

class ChartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnLabelClick = this.handleOnLabelClick.bind(this);
  }

  handleOnLabelClick(key) {
    const {
      selectedAttributes,
      type,
      onDeselectAttribute,
      onSelectAttribute
    } = this.props;
    selectedAttributes[key]
      ? onDeselectAttribute(key, type)
      : onSelectAttribute(key, type);
  }

  parseChartedAttributes() {
    const { selectedAttributes, lockedAttributes } = this.props;
    return Object.keys(selectedAttributes).map(key => [
      key,
      selectedAttributes[key] && !lockedAttributes[key]
    ]);
  }

  render() {
    const {
      selectedAttributes,
      lockedAttributes,
      data,
      resource,
      type,
      onLockAttribute,
      onUnlockAttribute
    } = this.props;
    const chartedAttributes = this.parseChartedAttributes();

    return (
      <Screen
        navigationBar={{
          title: resource
        }}
      >
        <View style={{ height: 250, backgroundColor: DARK_BLUE }}>
          {type === LINES && (
            <Line chartedAttributes={chartedAttributes} data={data} />
          )}
          {type === BARS && (
            <Bars chartedAttributes={chartedAttributes} data={data} />
          )}
          {type === PIE && (
            <Pie
              chartedAttributes={chartedAttributes}
              data={data}
              lockAttribute={onLockAttribute}
              unlockAttribute={onUnlockAttribute}
            />
          )}
        </View>

        <View style={{ flexDirection: "row" }}>

        </View>

        <View style={{ flexDirection: "row" }}>

        </View>

        <FlatList
          data={Object.keys(selectedAttributes)}
          keyExtractor={item => item}
          renderItem={({ item, index }) => {
            return (
              <Label
                id={item}
                value={Object.values(data[item]).slice(-1)[0]}
                color={getColorByIndex(index * 2)}
                selected={selectedAttributes[item]}
                locked={lockedAttributes[item]}
                onClick={this.handleOnLabelClick}
              />
            );
          }}
        />
      </Screen>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const type = ownProps.navigation.state.key;

  return {
    resource: state.selectedResource,
    data: state.liveResource,
    selectedAttributes: state.selectedAttributes[type],
    lockedAttributes: state.lockedAttributes[type],
    type
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectAttribute: (key, chart) => dispatch(selectAttribute(key, chart)),
    onDeselectAttribute: (key, chart) =>
      dispatch(deselectAttribute(key, chart)),
    onLockAttribute: (key, chart) => dispatch(lockAttribute(key, chart)),
    onUnlockAttribute: (key, chart) => dispatch(unlockAttribute(key, chart))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartScreen);
