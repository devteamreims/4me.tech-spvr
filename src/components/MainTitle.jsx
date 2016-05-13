import React, { Component } from 'react';

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
    } = this.props;

    return (
      <div style={styles.outer}>
        <h1 style={{display: 'inline'}}>Tech monitor</h1>
        <div style={{display: 'inline'}}>
          {!showLoader && <TimeAgo when={lastRefreshed} />}
          <RefreshIndicator
            status={showLoader ? 'loading' : 'hide'}
            top={0}
            left={0}
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
