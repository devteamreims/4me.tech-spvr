import React, { Component } from 'react';
import _ from 'lodash';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

import CheckIcon from 'material-ui/svg-icons/action/check-circle';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import UnknownIcon from 'material-ui/svg-icons/action/help';

import {
  red500,
  green500,
  orange500,
  grey500,
} from 'material-ui/styles/colors';

const iconColors = {
  normal: green500,
  warning: orange500,
  error: red500,
  unknown: grey500,
};

import StatusSubtitle from './StatusSubtitle';

const styles = {
  card: {
    margin: 10,
  },
};

const avatarSizes = {
  small: 20,
  normal: 35,
  large: 50,
};

class StatusCard extends Component {
  getAvatar = () => {
    const {
      status,
      size,
    } = this.props;

    const actualSize = _.get(avatarSizes, size, 30);
    const iconProps = {
      color: _.get(iconColors, status),
      style: {
        width: actualSize,
        height: actualSize,
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
      title,
      status,
      children,
      subtitle,
      size,
      description,
      style = {},
    } = this.props;

    let headerChildren = description ? (
      <div style={{marginLeft: _.get(avatarSizes, size, 30) + 16}}>
        {description}
      </div>
    ) : null;

    return (
      <Card
        initiallyExpanded={status !== 'normal'}
        style={Object.assign({}, styles.card, style)}
      >
        <CardHeader
          title={title}
          subtitle={subtitle}
          avatar={this.getAvatar()}
          children={headerChildren}
        />
        {children && [
          <Divider key="divider" />,
          <CardText key="text">
            {children}
          </CardText>
        ]}
      </Card>
    );
  }
}

StatusCard.propTypes = {
  title: React.PropTypes.string.isRequired,
  status: React.PropTypes.oneOf(['normal', 'warning', 'error', 'unknown']),
  subtitle: React.PropTypes.node,
  description: React.PropTypes.node,
  size: React.PropTypes.oneOf(['small', 'normal', 'large']),
};

StatusCard.defaultProps = {
  size: 'normal',
};

export default StatusCard;
