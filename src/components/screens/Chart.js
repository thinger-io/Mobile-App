import React from "react";
import { connect } from "react-redux";
import Line from "../charts/Line";
import { selectAttribute, deselectAttribute } from "../../actions/actions";
import styles from "../../styles/ThingerStyles";
import { getColorByIndex } from "../../utils/colors";
import { FlatList, ScrollView, Text, View } from "react-native";
import Card from "../cards/Card";
import Label from "../Label";
import Pie from "../charts/Pie";
import Bars from "../charts/Bars";
import { BARS, LINES, PIE } from "../navigators/Charts";
import GradientContainer from "../GradientContainer";

class ChartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnLabelClick = this.handleOnLabelClick.bind(this);
  }

  handleOnLabelClick(key) {
    const {
      enabledItems,
      type,
      onDeselectAttribute,
      onSelectAttribute
    } = this.props;
    enabledItems[key]
      ? onDeselectAttribute(key, type)
      : onSelectAttribute(key, type);
  }

  render() {
    const {
      enabledItems,
      data,
      resource,
      type,
      onDeselectAttribute
    } = this.props;
    if (Object.keys(data).length === 0) return null;

    return (
      <ScrollView style={{ flex: 1 }}>
        <Card>
          <View style={{ height: 250 }}>
            <Text style={styles.h1}>{resource}</Text>
            {type === LINES && <Line enabledItems={enabledItems} data={data} />}
            {type === BARS && <Bars enabledItems={enabledItems} data={data} />}
            {type === PIE && (
              <Pie
                enabledItems={enabledItems}
                data={data}
                deselectAttribute={onDeselectAttribute}
              />
            )}
          </View>
        </Card>

        <FlatList
          data={Object.keys(enabledItems)}
          keyExtractor={item => item}
          renderItem={({ item, index }) => {
            return (
              <Label
                id={item}
                value={data[item].slice(-1)[0]}
                color={getColorByIndex(index * 2)}
                enabled={enabledItems[item]}
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
    enabledItems: state.selectedAttributes[type],
    type
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectAttribute: (key, chart) => {
      dispatch(selectAttribute(key, chart));
    },
    onDeselectAttribute: (key, chart) => {
      dispatch(deselectAttribute(key, chart));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartScreen);
