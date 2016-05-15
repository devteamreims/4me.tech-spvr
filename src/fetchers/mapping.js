import request from './request';
import _ from 'lodash';

import {
  api,
} from '../config';

import {maxStatus} from '../utils/status';
import socketStatus from './socket';

export default function fetchXmanOrchestratorStatus() {
  return request.get(api.mapping)
    .then(resp => resp.body)
    .then(processMapping)
    .catch(backendUnavailable)
    .then(mergeDescription);
}

function processMapping(raw) {
  // Handle coreSocketClients
  const rawCoreSocketClients = _.get(raw, 'coreSocketClients');
  const coreSocketClients = Object.assign(
    {},
    socketStatus(rawCoreSocketClients),
    {description: 'Responsible for informing 4ME clients of who they are'}
  );

  // Handle mappingSocketClients
  const rawMappingSocketClients = _.get(raw, 'mappingSocketClients');
  const mappingSocketClients = Object.assign(
    {},
    socketStatus(rawMappingSocketClients),
    {description: 'Responsible for displaying the room map'}
  );

  const items = {
    coreSocketClients,
    mappingSocketClients,
  };

  return {
    status: maxStatus(_.map(items, 'status')),
    items,
    rawObj: raw,
    when: Date.now(),
  };
}


function backendUnavailable(err) {
  console.log('Mapping backend could not be reached');
  console.log(err);
  return {
    status: 'unknown',
    summary: `Mapping backend could not be reached`,
    when: Date.now(),
  };
}

function mergeDescription(status) {
  return {
    ...status,
    description: 'WebService managing control room/sectors mapping',
  };
}
