import request from './request';
import _ from 'lodash';

import {
  api,
} from '../config';

import {maxStatus} from '../utils/status';
import socketStatus from './socket';

export default function fetchXmanOrchestrator() {
  return request.get(api.xmanOrchestrator)
    .then(resp => resp.body)
    .then(processOrchestrator)
    .catch(backendUnavailable)
    .then(mergeDescription);
}

function processOrchestrator(raw) {
  // Handle top level status
  let {status} = raw;
  if(status === 'critical') {
    status = 'error';
  }

  const rawItems = _.get(raw, 'items');

  // Handle positions item
  const rawPositions = _.get(rawItems, 'positions');
  const positions = {
    status: _.get(rawPositions, 'status', 'unknown'),
    when: _.get(rawPositions, 'lastUpdated'),
    description: 'Connection to flight positions service',
    summary: _.get(rawPositions, 'error'),
  };

  // Handle fetchers items
  const rawFetchers = _.get(rawItems, 'fetchers');
  const fetchers = _(rawFetchers)
    .mapValues(processFetcher)
    .mapKeys((val, key) => `${key}Fetcher`)
    .value();

  // Handle socketClients
  const rawSocketClients = _.get(rawItems, 'socketClients');
  const socketClients = Object.assign(
    {},
    socketStatus(rawSocketClients),
    {description: 'Clients connected to the XMAN backend'}
  );

  const items = {
    socketClients,
    positions,
    ...fetchers,
  };

  return {
    status: maxStatus(_.map(items, 'status')),
    items,
    rawObj: raw,
    when: Date.now(),
  };
}

function processFetcher(rawFetcher, name) {
  let status = _.get(rawFetcher, 'status');
  if(status === 'critical') {
    status = 'error';
  }

  return {
    status,
    when: _.get(rawFetcher, 'lastUpdated'),
    description: `Connection to ${name} fetcher`,
    summary: _.get(rawFetcher, 'error'),
  };
}

function backendUnavailable(err) {
  console.log('XMAN Backend could not be reached');
  console.log(err);
  return {
    status: 'unknown',
    summary: `XMAN Orchestrator could not be reached`,
    when: Date.now(),
  };
}

function mergeDescription(status) {
  return {
    ...status,
    description: 'WebService maintaining XMAN flight list, collection and dispatching actions to clients',
  };
}
