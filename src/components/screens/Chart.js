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
    if (Object.keys(data).length === 0) return null;
    const chartedAttributes = this.parseChartedAttributes();

    return (
      <ScrollView style={{ flex: 1 }}>
        <Card>
          <View style={{ height: 250 }}>
            <Text style={styles.h1}>{resource}</Text>
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
        </Card>

        <FlatList
          data={Object.keys(selectedAttributes)}
          keyExtractor={item => item}
          renderItem={({ item, index }) => {
            return (
              <Label
                id={item}
                value={data[item].slice(-1)[0]}
                color={getColorByIndex(index * 2)}
                selected={selectedAttributes[item]}
                locked={lockedAttributes[item]}
                onClick={this.handleOnLabelClick}
              />
            );
          }}
        />
      </ScrollView>
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
