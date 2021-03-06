import React, { PureComponent } from 'react';
import AspectRatio from 'react-aspect-ratio';
import handleViewport from 'react-in-viewport';

import { polyfill } from 'react-lifecycles-compat';

const DUMMY_SRC = 'https://www.gstatic.com/psa/static/1.gif';
const STATUS_INIT = 0;
const STATUS_LOADING = 1;
const STATUS_LOADED = 2;

const OBJECT_SOURCE = ['img', 'iframe', 'object', 'video', 'embed', 'audio'];

class LazyObject extends PureComponent {
  static defaultProps = {
    nodeName: 'img',
    onLoad: () => {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.status === STATUS_LOADED) {
      return null;
    }
    const status = nextProps.inViewport ? STATUS_LOADING : STATUS_INIT;
    if (status !== prevState.status) {
      return {
        status
      };
    }
    return null;
  }
  
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.inViewport ? STATUS_LOADING : STATUS_INIT
    };
    this.renderElement = this.renderElement.bind(this);
  }

  componentDidMount() {
    if (this.props.inViewport) {
      this.renderElement();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inViewport && prevState.status !== STATUS_LOADED) {
      this.renderElement();
    }
  }

  renderElement() {
    const { nodeName } = this.props;

    if (nodeName === 'img' || nodeName === 'div') {
      // prefetch
      const ele = new Image();
      ele.onload = e => {
        this.setState(
          {
            status: STATUS_LOADED
          },
          this.props.onLoad()
        );
      };
      ele.src = this.props.src;
    } else {
      this.setState(
        {
          status: STATUS_LOADED
        },
        this.props.onLoad()
      );
    }
  }
  render() {
    const {
      aspectRatioProps,
      innerRef,
      inViewport,
      nodeName,
      src,
      viewportProps,
      style,
      ...others
    } = this.props;

    const targetSrc = this.state.status ? this.props.src : DUMMY_SRC;
    var customProps = { ...others };

    if (nodeName === 'div') {
      // background image
      customProps.style = {
        backgroundSize: 'cover',
        backgroundImage: `url(${targetSrc})`,
        ...style
      };
    } else {
      customProps.src = targetSrc;
    }

    return (
      <AspectRatio {...aspectRatioProps}>
        {React.createElement(nodeName, { ...customProps })}
      </AspectRatio>
    );
  }
}

export default handleViewport(polyfill(LazyObject));
