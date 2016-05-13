import React, { Component } from 'react';

import StatusCard from '../StatusCard';
import StatusSubtitle from '../StatusSubtitle';


class XmanStatus extends Component {

  render() {
    const errorCount = 1;
    const warningCount = 2;

    return (
      <StatusCard
        name="XMAN"
        status="normal"
        warningCount={warningCount}
        errorCount={errorCount}
      >
        pouet
      </StatusCard>
    );
  }
}

export default XmanStatus;
