import React, { Component } from 'react';
import _ from 'lodash';

import RefreshIndicator from './RefreshIndicator';

import TimeAgo from './TimeAgo';

const styles = {
  outer: {
    margin: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
};

class MainTitle extends Component {

  render() {
    const {
      showLoader,
      lastRefresh,
      nextRefresh,
      handleForceRefresh = _.noop
    } = this.props;

    return (
      <div style={styles.outer}>
        <h1 style={{display: 'inline'}}>Tech monitor</h1>
        <RefreshIndicator
          showLoader={showLoader}
          style={{position: 'relative', display: 'inline-block'}}
          onClick={handleForceRefresh}
          lastRefresh={lastRefresh}
          nextRefresh={nextRefresh}
        />
      </div>
    );
  }
}

MainTitle.propTypes = {
  showLoader: React.PropTypes.bool,
  lastRefresh: React.PropTypes.number,
  nextRefresh: React.PropTypes.number,
  handleForceRefresh: React.PropTypes.func,
};

export default MainTitle;
