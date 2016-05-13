import React, { Component } from 'react';
import _ from 'lodash';

import RefreshIndicator from 'material-ui/RefreshIndicator';

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
      lastRefreshed,
      handleForceRefresh = _.noop
    } = this.props;

    return (
      <div style={styles.outer}>
        <h1 style={{display: 'inline'}}>Tech monitor</h1>
        <div
          style={{display: 'inline'}}
          onClick={handleForceRefresh}
        >
          <RefreshIndicator
            status={showLoader ? 'loading' : 'ready'}
            top={0}
            left={0}
            percentage={100}
            style={{position: 'relative', display: 'inline-block'}}

          />
        </div>
      </div>
    );
  }
}

MainTitle.propTypes = {
  showLoader: React.PropTypes.bool,
  lastRefreshed: React.PropTypes.number,
  handleForceRefresh: React.PropTypes.func,
};

export default MainTitle;
