import React, { Component } from 'react';

import MainTitle from './MainTitle';
import XmanStatus from './xman';
import MappingStatus from './mapping';

import fetchStatus from '../fetchers';
import processStatus from '../status-processor';


class Root extends Component {
  constructor(props) {
    super(props);
    this.refreshInterval = null;
    this.state = {
      lastRefreshed: null,
      isLoading: false,
      status: null,
    };
  }

  componentDidMount() {
    const interval = 15000;

    this.refreshInterval = setInterval(this.fetchStatus, interval);

    this.fetchStatus();
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
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
        />
        <XmanStatus />
        <MappingStatus />
      </div>
    );
  }
}


export default Root;
