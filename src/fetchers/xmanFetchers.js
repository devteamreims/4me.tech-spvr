import request from './request';
import _ from 'lodash';

import {
  api,
  constants,
} from '../config';

import {maxStatus} from '../utils/status';

export default function fetchFetchersStatuses() {
  return Promise.props(
    _.mapValues(
      api.xmanFetchers,
      (url, destination) => {
        return request.get(url)
          .then(resp => resp.body)
          .then(processSingleFetcher)
          .catch(backendUnavailable(destination));
      }
    )
  )
  .then(toStatusObject);
}

function processSingleFetcher(raw) {
  console.log('processSingleFetcher:');
  console.log(raw);
  const {
    error,
    when,
    rawResponse,
  } = _.get(raw, 'lastRequest');

  return {
    status: error ? 'error' : 'normal',
    description: 'Last request to remote XML data',
    rawObj: raw,
    when,
  };
}

function toStatusObject(processedSingleItems) {
  console.log('toStatusObject !');
  console.log(processedSingleItems);
  return {
    status: maxStatus(_.map(processedSingleItems, item => item.status)),
    items: processedSingleItems,
    description: 'Services fetching and transforming XMAN XMLs',
  };
}

function backendUnavailable(destination) {
  return err => {
    return {
      status: 'unknown',
      summary: `${destination} Fetcher could not be reached`,
      description: 'Last request to remote XML data',
      when: Date.now(),
    };
  };
}
