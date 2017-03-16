import React, { PureComponent } from 'react';
import AspectRatio from 'react-aspect-ratio';
import handleViewport from 'react-in-viewport';

const DUMMY_SRC = 'https://www.gstatic.com/psa/static/1.gif';
const STATUS_INIT = 0;
const STATUS_LOADING = 1;
const STATUS_LOADED = 2;

const OBJECT_SOURCE = ['img', 'iframe', 'object', 'video', 'embed', 'audio'];

class LazyObject extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status : this.props.inViewport ? STATUS_LOADING : STATUS_INIT
    };
    this.renderElement = this.renderElement.bind(this);
  }

  componentDidMount() {
    if (this.props.inViewport) {
      this.renderElement();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inViewport) {
      this.renderElement();
    }
  }

  renderElement() {
    const { nodeName } = this.props;

    if (nodeName === 'img') {
      // prefetch
      const ele = document.createElement(this.props.nodeName);
      ele.onload = (e) => {
        this.setState({
          status: STATUS_LOADED
        }, this.props.onLoad());
      };
      ele.src = this.props.src;
    } else {
      this.setState({
        status: STATUS_LOADED
      }, this.props.onLoad())
    }
  }
  render() {
    const {
      aspectRatioProps,
      viewportProps,
      nodeName,
      innerRef,
      inViewport,
      ...others
    } = this.props;

    return (
      <AspectRatio {...aspectRatioProps}>
        {React.createElement(nodeName, {...others, src: (this.state.status ? this.props.src : DUMMY_SRC)})}
      </AspectRatio>
    );
  }
};

LazyObject.defaultProps = {
  nodeName: 'img',
  onLoad: () => {}
};

export default handleViewport(LazyObject);
