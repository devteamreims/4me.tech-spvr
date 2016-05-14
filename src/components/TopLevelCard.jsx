import React, { Component } from 'react';
import _ from 'lodash';

import StatusCard from './StatusCard';
import StatusSubtitle from './StatusSubtitle';

class TopLevelCard extends Component {
  render() {
    const {
      title,
      status,
      subtitle: propSubtitle,
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
            <div>
              {_.map(more, (m, key) => <p key={key}>{m}</p>)}
            </div>
          );
        }

        return (
          <StatusCard
            title={name}
            description={summary}
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
        title={_.toUpper(title)}
        status={status}
        size="large"
        subtitle={
          propSubtitle ||
          <StatusSubtitle
            status="normal"
            warningCount={0}
            errorCount={0}
          />
        }
        children={children}
        {...other}
      />
    );
  }
}

TopLevelCard.propTypes = {
  title: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string,
  items: React.PropTypes.object,
};

export default TopLevelCard;

