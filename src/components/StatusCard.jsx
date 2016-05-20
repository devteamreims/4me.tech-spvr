import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

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
  yellow500,
  purple500,
} from 'material-ui/styles/colors';

const iconColors = {
  normal: green500,
  warning: yellow500,
  error: red500,
  unknown: purple500,
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

  getHeaderChildren() {
    const {
      headerMeta,
      when,
      size,
    } = this.props;

    const shouldDisplayChildren = headerMeta || when;

    if(!shouldDisplayChildren) {
      return;
    }

    let children = [];

    if(when) {
      moment.locale('fr');
      const formattedTimestamp = moment(when).fromNow();
      children = [
        ...children,
        <span>{formattedTimestamp}</span>,
      ];
    }

    if(headerMeta) {
      if(typeof headerMeta === 'string') {
        children = [
          ...children,
          <span>{headerMeta}</span>
        ];
      } else {
        children = [
          ...children,
          headerMeta,
        ];
      }
    }

    return (
      <div
        style={{
          marginLeft: _.get(avatarSizes, size, 30) + 16, // Add icon margin
          whiteSpace: 'initial', // Allow new lines (seems to be overridden somewhere in material ui)
          flexDirection: 'column',
          display: 'flex',
        }}
      >
        {children}
      </div>
    );

  }

  render() {
    const {
      title,
      status,
      children,
      subtitle,
      when,
      size,
      headerMeta,
      style = {},
    } = this.props;


    return (
      <Card
        initiallyExpanded={status !== 'normal'}
        style={Object.assign({}, styles.card, style)}
      >
        <CardHeader
          title={title}
          subtitle={subtitle}
          avatar={this.getAvatar()}
          children={this.getHeaderChildren()}
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
  headerMeta: React.PropTypes.node,
  timestamp: React.PropTypes.string,
  size: React.PropTypes.oneOf(['small', 'normal', 'large']),
};

StatusCard.defaultProps = {
  size: 'normal',
};

export default StatusCard;
