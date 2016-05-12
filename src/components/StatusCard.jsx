import React, { Component } from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Avatar from 'material-ui/Avatar';

class StatusCard extends Component {
  render() {
    const {
      name,
      status,
      children,
    } = this.props;

    return (
      <Card>
        <CardHeader
          title={name}
          subtitle="pouet"
          avatar={<Avatar icon={<FileFolder />} />}
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

StatusCard.PropTypes = {
  status: React.PropTypes.oneOf(['normal', 'warning', 'error']),
};


export default StatusCard;
