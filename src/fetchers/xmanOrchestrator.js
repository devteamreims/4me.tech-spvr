import request from './request';
import _ from 'lodash';

import {
  api,
} from '../config';

import {maxStatus} from '../utils/status';

export default function fetchXmanOrchestratorStatus() {
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

  const items = _.get(raw, 'items');

  // Handle positions item
  const rawPositions = _.get(items, 'positions');
  const positions = {
    status: _.get(rawPositions, 'status', 'unknown'),
    when: _.get(rawPositions, 'lastUpdated'),
    description: 'Connection to flight positions service',
    summary: _.get(rawPositions, 'error'),
  };

  // Handle fetchers items
  const rawFetchers = _.get(items, 'fetchers');
  const fetchers = _(rawFetchers)
    .mapValues(processFetcher)
    .mapKeys((val, key) => `${key}Fetcher`)
    .value();

  // Handle socketClients

  const rawClients = _.get(items, 'socketClients');
  const socketClients = {
    status: 'unknown',
    when: Date.now(),
    description: 'Number of 4ME clients connected',
    summary: `${_.size(rawClients)} client(s) connected`,
  };

  return {
    status,
    items: {
      positions,
      ...fetchers,
      socketClients,
    },
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
