import stubStatuses from '../stubStatuses';
import _ from 'lodash';

import xmanFetchers from './xmanFetchers';
import flightPositions from './flightPositions';
import xmanOrchestrator from './xmanOrchestrator';
import mapping from './mapping';
import arcid from './arcid';


export default function fetchStatus() {
  console.log('Refresh started');
  const refreshPromises = {
    xmanOrchestrator,
    arcid,
    mapping,
    xmanFetchers,
    flightPositions,
  };

  return Promise.props(_.mapValues(refreshPromises, f => f.call()))
    .then(res => {
      console.log('Refresh ended !');
      return res;
    });
};
