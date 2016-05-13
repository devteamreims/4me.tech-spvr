import React, { Component } from 'react';

class StatusSubtitle extends Component {
  render() {
    const {
      warningCount,
      errorCount,
    } = this.props;

    let content = '';

    if(warningCount === 0 && errorCount === 0) {
      content = 'Everything is fine.';
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
};

export default StatusSubtitle;
