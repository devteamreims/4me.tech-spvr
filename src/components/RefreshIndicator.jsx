import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

import MaterialRefreshIndicator from 'material-ui/RefreshIndicator';

class RefreshIndicator extends Component {
  constructor(props) {
    super(props);

    this.refreshInterval = null;

    this.state = {
      percentage: 50,
    };
  }

  componentDidMount() {
    const {
      lastRefresh,
      nextRefresh,
    } = this.props;

    const interval = 200;

    this.refreshInterval = setInterval(this.updatePercentage, interval);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  updatePercentage = () => {
    const {
      lastRefresh,
      nextRefresh,
      showLoader,
    } = this.props;

    const {
      percentage,
    } = this.state;

    if(showLoader) {
      return;
    }

    const refreshInterval = nextRefresh - lastRefresh;

    const advance = Date.now() - lastRefresh;

    const newPercentage = refreshInterval ? Math.floor(100*advance / refreshInterval) : 50;

    if(newPercentage !== percentage) {
      this.setState({
        percentage: newPercentage,
      });
    }

  };

  render() {
    const {
      showLoader,
      onClick = _.noop,
      ...rest
    } = this.props;

    const {
      percentage,
    } = this.state;

    return (
      <div
        style={{display: 'inline'}}
        onClick={onClick}
      >
        <MaterialRefreshIndicator
          status={showLoader ? 'loading' : 'ready'}
          top={0}
          left={0}
          color={"red"}
          percentage={percentage}
          {...rest}
        />
      </div>
    );
  }
}

RefreshIndicator.propTypes = {
  showLoader: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  lastRefresh: React.PropTypes.number,
  nextRefresh: React.PropTypes.number,
};

export default RefreshIndicator;
