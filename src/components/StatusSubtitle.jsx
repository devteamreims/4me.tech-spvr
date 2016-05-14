import React, { Component } from 'react';

class StatusSubtitle extends Component {
  render() {
    const {
      warningCount,
      errorCount,
      status,
    } = this.props;

    let content = '';

    if(status === 'normal') {
      content = 'Everything is fine.';
    } else if(status === 'unknown') {
      content = `Unknown status`;
    } else {
      content = `${warningCount} warning items, ${errorCount} error items`;
    }

    return (
      <span>{content}</span>
    );
  }
}

StatusSubtitle.PropTypes = {
  warningCount: React.PropTypes.number.isRequired,
  errorCount: React.PropTypes.number.isRequired,
  status: React.PropTypes.oneOf(['error', 'warning', 'unknown', 'normal']),
};

export default StatusSubtitle;
