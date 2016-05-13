import React, { Component } from 'react';

import moment from 'moment';

class TimeAgo extends Component {

  constructor(props) {
    super(props);

    this.refreshInterval = null;
  }

  componentDidMount() {
    const interval = 200;

    this.refreshInterval = setInterval(() => {
      this.forceUpdate();
    }, interval);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  render() {
    const {
      when,
    } = this.props;

    const seconds = moment().diff(when, 'seconds');
    const formattedTime = `${seconds}s ago`;

    return (
      <span>{formattedTime}</span>
    );
  }
}

TimeAgo.propTypes = {
  when: React.PropTypes.isRequired,
};

export default TimeAgo;
