import React from "react";
import PropTypes from "prop-types";

class Resource extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: {} };
    this.handleOnUpdateClick = this.handleOnUpdateClick.bind(this);
    this.handleOnPostClick = this.handleOnPostClick.bind(this);
  }

  handleOnUpdateClick() {
    const { name, onUpdateClick } = this.props;
    onUpdateClick(name);
  }

  handleOnPostClick() {
    const { name, onPostClick } = this.props;
    onPostClick(name);
    this.setState({ input: {} });
  }

  static castStringInput(value, type) {
    switch (type) {
      case "number":
        return Number(value.replace(",", "."));
      default:
        return value;
    }
  }
}

Resource.propTypes = {
  name: PropTypes.string.isRequired,
  onUpdateClick: PropTypes.func,
  onPostClick: PropTypes.func,
  onChartClick: PropTypes.func
};

export default Resource;
