import React, { Component } from 'react';

import MainTitle from './MainTitle';
import TopLevelCard from './TopLevelCard';

import fetchStatus from '../fetchers';


import { constants } from '../config';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 0,
    margin: 0,
    flexGrow: 1,
    overflowX: 'hidden',
  },
  card: {
    margin: 20,
    padding: 0,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    minWidth: 300,
  },
};

class Root extends Component {
  constructor(props) {
    super(props);

    this.refreshHandler = null;
    this.refreshInterval = constants.refreshInterval || 15000;

    this.state = {
      lastRefresh: null,
      isLoading: false,
      status: null,
      nextRefresh: Date.now() + this.refreshInterval,
    };
  }

  componentDidMount() {
    this.forceRefresh();
  }

  componentWillUnmount() {
    clearTimeout(this.refreshHandler);
  }

  fetchStatus = () => {
    this.setState({isLoading: true});
    console.log('Refreshing status ...');
    return fetchStatus()
      .then(status => {
        this.setState({
          isLoading: false,
          lastRefresh: Date.now(),
          nextRefresh: Date.now() + this.refreshInterval,
          status,
        });
        this.refreshHandler = setTimeout(this.fetchStatus, this.refreshInterval);
      })
  };

  forceRefresh = () => {
    const { isLoading } = this.state;
    if(isLoading) {
      return;
    }

    clearTimeout(this.refreshHandler);
    this.fetchStatus();
  };

  render() {
    const {
      status,
      isLoading,
      lastRefresh,
      nextRefresh,
    } = this.state;

    if(isLoading && !lastRefresh) {
      return (
        <span>Initial load ...</span>
      );
    }

    return (
      <div>
        <MainTitle
          showLoader={isLoading}
          lastRefresh={lastRefresh}
          nextRefresh={nextRefresh}
          handleForceRefresh={this.forceRefresh}
        />
        <div style={styles.container}>
          {_.map(status, (c, key) =>
            <TopLevelCard
              title={key}
              style={styles.card}
              status={_.get(c, 'status')}
              subtitle={_.get(c, 'description')}
              headerMeta={_.get(c, 'summary')}
              items={_.get(c, 'items')}
              key={key}
            />
          )}
        </div>
      </div>
    );
  }
}


export default Root;
