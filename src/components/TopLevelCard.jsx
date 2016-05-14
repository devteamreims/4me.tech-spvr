import React, { Component } from 'react';
import _ from 'lodash';

import StatusCard from './StatusCard';
import StatusSubtitle from './StatusSubtitle';

const transformTitle = _.flow(_.startCase, _.toUpper);

class TopLevelCard extends Component {
  render() {
    const {
      title,
      status,
      headerMeta,
      subtitle,
      items,
      ...other
    } = this.props;

    let children;
    if(!_.isEmpty(items)) {
      children = _.map(items, (item, name) => {
        const {
          status,
          summary,
          description,
          when,
          more,
        } = item;

        let children = more;
        if(_.isArray(children)) {
          children = (
            <ul>
              {_.map(more, (m, key) => <li key={key}>{m}</li>)}
            </ul>
          );
        }

        return (
          <StatusCard
            title={transformTitle(name)}
            headerMeta={summary}
            status={status}
            subtitle={description}
            when={when}
            key={name}
            children={children}
          />
        );
      });
    }


    return (
      <StatusCard
        title={transformTitle(title)}
        status={status}
        size="large"
        subtitle={subtitle}
        headerMeta={headerMeta}
        children={children}
        {...other}
      />
    );
  }
}

TopLevelCard.propTypes = {
  title: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.node,
  headerMeta: React.PropTypes.node,
  items: React.PropTypes.object,
};

export default TopLevelCard;

