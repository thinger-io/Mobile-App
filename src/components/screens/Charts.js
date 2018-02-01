import React from "react";
import { connect } from "react-redux";
import Line from "../charts/Line";
import {
  getResourceFromApi,
  selectItem,
  deselectItem,
  removeItems
} from "../../actions/actions";
import styles from "../../utils/styles";
import { getColorByIndex } from "../../utils/colors";
import { FlatList, ScrollView, Text, View } from "react-native";
import Card from "../cards/Card";
import Label from "../Label";
import Pie from "../charts/Pie";
import LinesChartButton from "../buttons/LinesChart";
import PieChartButton from "../buttons/PieChart";
import BarsChartButton from "../buttons/BarsChart";
import Bars from "../charts/Bars";

class ChartsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.refreshInterval = null;
    this.state = { type: "Lines" };
    this.handleOnLabelClick = this.handleOnLabelClick.bind(this);
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

  render() {
    const { enabledItems, data, resource, onDeselectItem } = this.props;
    const { type } = this.state;
    if (Object.keys(data).length === 0 && data.constructor === Object)
      return null;

    return (
      <ScrollView style={{ flex: 1 }}>
        <Card>
          <View style={styles.header}>
            <Text style={styles.title}>{resource}</Text>
          </View>
          {type === "Lines" && <Line enabledItems={enabledItems} data={data} />}
          {type === "Bars" && <Bars enabledItems={enabledItems} data={data} />}
          {type === "Pie" && (
            <Pie
              enabledItems={enabledItems}
              data={data}
              deselectItem={onDeselectItem}
            />
          )}
          <View style={styles.footer}>
            <LinesChartButton
              onClick={() => {
                this.setState({ type: "Lines" });
              }}
            />
            <BarsChartButton
              onClick={() => {
                this.setState({ type: "Bars" });
              }}
            />
            <PieChartButton
              onClick={() => {
                this.setState({ type: "Pie" });
              }}
            />
          </View>
        </Card>

        <FlatList
          data={Object.keys(enabledItems)}
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
