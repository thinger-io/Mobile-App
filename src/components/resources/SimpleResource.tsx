import * as React from 'react';
import { Attribute } from '../../types/Attribute';
import { SimpleResource } from '../../types/Resource';
import RunAttribute from './RunAttribute';
import InputAttribute from './InputAttribute';
import OutputAttribute from './OutputAttribute';
import ResourceComponent from './Resource';

type Props = {
  resource: string;
  data: SimpleResource;
  isFetching: boolean;
  onPostClick: (id: string, data: Attribute) => any;
  onUpdateClick: (id: string) => any;
  onChartClick: () => any;
  run: (id: string) => any;
};

type State = {
  in?: Attribute;
  posted: boolean;
};

const defaultState: State = {
  in: undefined,
  posted: false,
};

class SimpleResourceView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = defaultState;
    (this as any).handleOnPostClick = this.handleOnPostClick.bind(this);
    (this as any).handleOnChangeAttribute = this.handleOnChangeAttribute.bind(this);
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (prevState.posted) {
      return defaultState;
    }
    return null;
  }

  handleOnPostClick() {
    const { resource, data, onPostClick } = this.props;
    const { in: input } = this.state;
    if (input === undefined) {
      onPostClick(resource, data.in);
    } else if (typeof data.in === 'number' && typeof input === 'string') {
      onPostClick(resource, Number(String(input).replace(',', '.')));
    } else {
      onPostClick(resource, input);
    }
    this.setState({ in: input, posted: true });
  }

  handleOnChangeAttribute(id: string, value: Attribute) {
    const { onPostClick } = this.props;
    this.setState({ in: value, posted: false });
    if (typeof value === 'boolean') {
      onPostClick(id, value);
    }
  }

  renderAttributes() {
    const { resource, data, run } = this.props;
    const { in: input } = this.state;

    // Run resource
    if (Object.keys(data).length === 0) {
      return <RunAttribute id={resource} run={run} />;
    }

    // Input Resource
    if ('in' in data) {
      return (
        <InputAttribute
          id={resource}
          value={data.in}
          inputValue={input}
          isSimple
          onChange={this.handleOnChangeAttribute}
        />
      );
    }

    // Output Resource
    if ('out' in data) {
      return <OutputAttribute id={resource} value={data.out} isSimple />;
    }

    return null;
  }

  render() {
    const { resource, data, isFetching, onUpdateClick, onChartClick } = this.props;
    return (
      <ResourceComponent
        isFetching={isFetching}
        onUpdateClick={'out' in data ? () => onUpdateClick(resource) : undefined}
        onChartClick={'out' in data && typeof data.out === 'number' ? onChartClick : undefined}
        onPostClick={'in' in data && typeof data.in !== 'boolean' ? () => this.handleOnPostClick() : undefined}
      >
        {this.renderAttributes()}
      </ResourceComponent>
    );
  }
}

export default SimpleResourceView;
