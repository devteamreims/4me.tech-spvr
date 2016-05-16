import request from './request';
import _ from 'lodash';

import {
  api,
} from '../config';

import {maxStatus} from '../utils/status';
import socketStatus from './socket';

export default function fetchArcid() {
  return request.get(api.arcid)
    .then(resp => resp.body)
    .then(processArcid)
    .catch(backendUnavailable)
    .then(mergeDescription);
}

function processArcid(raw) {
  // Handle coreSocketClients
  const rawSocketClients = _.get(raw, 'socketClients');
  const socketClients = Object.assign(
    {},
    socketStatus(rawSocketClients),
    {description: 'Clients connected to the ARCID backend'}
  );

  // Handle autocompleteStatus
  const rawAutocomplete = _.get(raw, 'autocompleteStatus');
  const autocomplete = {
    status: _.get(rawAutocomplete, 'status', 'unknown'),
    when: _.get(rawAutocomplete, 'lastUpdated'),
    description: 'Last request to NM B2B to populate autocomplete data',
    summary: _.get(rawAutocomplete, 'error'),
  };

  // Handle request by callsign
  const rawCallsign = _.get(raw, 'flightRequestStatus');
  const callsignSearch = {
    status: _.get(rawCallsign, 'status', 'unknown'),
    when: _.get(rawCallsign, 'lastUpdated'),
    description: 'Last request by callsign to NM B2B',
    summary: _.get(rawCallsign, 'error'),
  };

    // Handle request by callsign
  const rawIfplId = _.get(raw, 'flightPlanRequestStatus');
  const ifplIdSearch = {
    status: _.get(rawIfplId, 'status', 'unknown'),
    when: _.get(rawIfplId, 'lastUpdated'),
    description: 'Last request by IFPL ID to NM B2B',
    summary: _.get(rawIfplId, 'error'),
  };

  const items = {
    socketClients,
    callsignSearch,
    ifplIdSearch,
  };

  return {
    status: maxStatus(_.map(items, 'status')),
    items,
    rawObj: raw,
    when: Date.now(),
  };
}


function backendUnavailable(err) {
  console.log('ARCID backend could not be reached');
  console.log(err);
  return {
    status: 'unknown',
    summary: `ARCID backend could not be reached`,
    when: Date.now(),
  };
}

function mergeDescription(status) {
  return {
    ...status,
    description: 'WebService managing control room/sectors mapping',
  };
}
