import _ from 'lodash';

import {
  constants,
} from '../config';

export default function socketStatus(clients) {
  const {expectedClients} = constants;

  let status = 'normal';
  if(_.size(clients) !== expectedClients) {
    status = 'warning';
  }

  return {
    status,
    when: Date.now(),
    summary: `${_.size(clients)}/${expectedClients} client(s) connected`,
  };
}
