import React, { Component } from 'react';
import _ from 'lodash';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

import CheckIcon from 'material-ui/svg-icons/action/check-circle';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import UnknownIcon from 'material-ui/svg-icons/action/help';

import {
  red500,
  green500,
  orange500,
} from 'material-ui/styles/colors';

const iconColors = {
  normal: green500,
  warning: orange500,
  error: red500,
};

import StatusSubtitle from './StatusSubtitle';

class StatusCard extends Component {
  getAvatar = () => {
    const {
      status,
    } = this.props;

    const size = 40;
    const iconProps = {
      color: _.get(iconColors, status),
      style: {
        width: size,
        height: size,
      },
    };

    switch(status) {
      case 'normal':
        return <CheckIcon {...iconProps} />
      case 'warning':
        return <WarningIcon {...iconProps} />
      case 'error':
        return <ErrorIcon {...iconProps} />
      default:
        return <UnknownIcon {...iconProps} />
    }
  };

  render() {
    const {
      name,
      status,
      children,
      subtitle,
      warningCount,
      errorCount,
    } = this.props;

    return (
      <Card
        initiallyExpanded={status !== 'normal'}
      >
        <CardHeader
          title={name}
          subtitle={<StatusSubtitle warningCount={warningCount} errorCount={errorCount} />}
          avatar={this.getAvatar()}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          {children}
        </CardText>
      </Card>
    );
  }
}

StatusCard.propTypes = {
  status: React.PropTypes.oneOf(['normal', 'warning', 'error']),
  warningCount: React.PropTypes.number.isRequired,
  errorCount: React.PropTypes.number.isRequired,
};


export default StatusCard;
