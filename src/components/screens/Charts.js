import React from "react";
import { connect } from "react-redux";
import Line from "../charts/Line";
import {
  getResourceFromApi,
  selectItem,
  deselectItem,
  removeItems
} from "../../actions/actions";
import styles from "../../styles/common";
import { getColorByIndex } from "../../utils/colors";
import { FlatList, ScrollView, Text, View } from "react-native";
import Card from "../Card";
import Label from "../Label";
import Pie from "../charts/Pie";
import LinesChartButton from "../buttons/LinesChart";
import PieChartButton from "../buttons/PieChart";
import BarsChartButton from "../buttons/BarsChart";
import Bars from "../charts/Bars";

const LINES = "LINES";
const BARS = "BARS";
const PIE = "PIE";

class ChartsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.refreshInterval = null;
    this.state = { type: LINES };
    this.handleOnLabelClick = this.handleOnLabelClick.bind(this);
    this.handleOnCharTypeClick = this.handleOnCharTypeClick.bind(this);
  }

  componentDidMount() {
    const { device, resource, onInit, onRefresh } = this.props;
    const delay = 1000;
    onInit(device, resource);
    this.refreshInterval = setInterval(
      () => onRefresh(device, resource),
      delay
    );
  }

  componentWillUnmount() {
    this.props.onFinish(this.refreshInterval);
  }

  handleOnLabelClick(key) {
    const { enabledItems, onDeselectItem, onSelectItem } = this.props;
    enabledItems[key] ? onDeselectItem(key) : onSelectItem(key);
  }

  handleOnCharTypeClick(type) {
    this.setState({ type: type });
  }

  render() {
    const { enabledItems, data, resource, onDeselectItem } = this.props;
    const { type } = this.state;
    if (Object.keys(data).length === 0) return null;

    return (
      <ScrollView style={{ flex: 1 }}>
        <Card
          body={
            <View>
              <Text style={styles.h1}>{resource}</Text>
              {type === LINES && (
                <Line enabledItems={enabledItems} data={data} />
              )}
              {type === BARS && (
                <Bars enabledItems={enabledItems} data={data} />
              )}
              {type === PIE && (
                <Pie
                  enabledItems={enabledItems}
                  data={data}
                  deselectItem={onDeselectItem}
                />
              )}
            </View>
          }
          footer={[
            <LinesChartButton
              onClick={() => this.handleOnCharTypeClick(LINES)}
            />,
            <BarsChartButton
              onClick={() => this.handleOnCharTypeClick(BARS)}
            />,
            <PieChartButton onClick={() => this.handleOnCharTypeClick(PIE)} />
          ]}
        />

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

const mapStateToProps = state => {
  const jti = state.selectedDevice;
  const resource = state.selectedResource;
  const enabledItems = state.selectedItems;
  const data = state.liveResource;

  return {
    device: state.devices[jti],
    resource,
    data,
    enabledItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRefresh: (device, resource) => {
      dispatch(getResourceFromApi(device, resource));
    },
    onInit: (device, resource) => {
      dispatch(getResourceFromApi(device, resource)).then(({ value }) => {
        Object.keys(value["out"]).forEach(key => dispatch(selectItem(key)));
      });
    },
    onFinish: refreshInterval => {
      dispatch(removeItems());
      clearInterval(refreshInterval);
    },
    onSelectItem: key => {
      dispatch(selectItem(key));
    },
    onDeselectItem: key => {
      dispatch(deselectItem(key));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartsScreen);
