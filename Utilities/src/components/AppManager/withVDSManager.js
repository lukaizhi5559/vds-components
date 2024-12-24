import React from 'react';
import PropTypes from 'prop-types';
import ViewportManager from './ViewportManager';
import _isStyledComponent from '../../utils/isStyledComponent';
import ErrorBoundary from './ErrorBoundary';
// import -rc from './injectStyles';

const CHARACTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const wrapWithManager = (Component, expanded = false) => {
  const componentName = Component
    ? Component.displayName || Component.name
    : 'Component';
  const isStatelessFunctionalComponent =
    typeof Component === 'function' &&
    !(Component.prototype && 'isReactComponent' in Component.prototype);

  // NOTE: We can't pass a ref to a stateless functional component
  const shouldSetInnerRef =
    _isStyledComponent(Component) || isStatelessFunctionalComponent;

  class WithManager extends React.Component {
    constructor(props) {
      super(props);
      this.viewportManager = ViewportManager; // will return viewport: { normalViewport, expandedViewport } format
      this.state = { viewport: undefined };
      this.id = this._makeid(10);
    }

    static displayName = `WithManager(${componentName})`;

    _makeid(length) {
      var result = '';
      var charactersLength = CHARACTERS.length;
      for (var i = 0; i < length; i++) {
        let randomNum = Math.random();
        let flooredNum = Math.floor(randomNum * 10);
        result += CHARACTERS.charAt(flooredNum);
      }
      return result;
    }

    componentDidMount() {
      // For intial viewport
      this.setState({
        viewport: expanded
          ? this.viewportManager.viewport.expandedViewport
          : this.viewportManager.viewport.normalViewport,
      });
      this.viewportManager.subscribe(this.id, expanded, vp => {
        this.setState({ viewport: vp });
      });
    }

    componentWillUnmount() {
      this.viewportManager.unsubscribe(this.id);
    }

    render() {
      const props = {
        viewport: this.state.viewport,
        ...this.props,
      };

      if (!shouldSetInnerRef) {
        props.ref = props.innerRef;
        delete props.innerRef;
      }

      return (
        <ErrorBoundary>
          <Component {...props} />
        </ErrorBoundary>
      );
    }
  }

  return WithManager;
};

export default wrapWithManager;
