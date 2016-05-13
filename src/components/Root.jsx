import React, { Component } from 'react';

import MainTitle from './MainTitle';
import XmanStatus from './xman';
import MappingStatus from './mapping';

import fetchStatus from '../fetchers';
import processStatus from '../status-processor';


class Root extends Component {
  constructor(props) {
    super(props);

    this.refreshHandler = null;
    this.refreshInterval = 15000;

    this.state = {
      lastRefreshed: null,
      isLoading: false,
      status: null,
    };
  }

  componentDidMount() {
    this.forceRefresh();
  }

  componentWillUnmount() {
    clearInterval(this.refreshHandler);
  }

  fetchStatus = () => {
    this.setState({isLoading: true});
    return fetchStatus()
      .then(processStatus)
      .then(status => {
        console.log('Refresh ended !');
      })
      .then(status =>
        this.setState({
          isLoading: false,
          lastRefreshed: Date.now(),
          status,
        })
      )
  };

  forceRefresh = () => {
    const { isLoading } = this.state;
    if(isLoading) {
      return;
    }

    clearInterval(this.refreshHandler);
    this.refreshHandler = setInterval(this.fetchStatus, this.refreshInterval);
    this.fetchStatus();
  };

  render() {
    const {
      status,
      isLoading,
      lastRefreshed,
    } = this.state;

    if(isLoading && !lastRefreshed) {
      return (
        <span>Initial load ...</span>
      );
    }

    return(
      <div>
        <MainTitle
          showLoader={isLoading}
          lastRefreshed={lastRefreshed}
          handleForceRefresh={this.forceRefresh}
        />
        <XmanStatus />
        <MappingStatus />
      </div>
    );
  }
}


export default Root;
