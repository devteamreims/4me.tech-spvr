import _ from 'lodash';

//import mapping from './mapping';
//import xman from './xman';
import arcid from './arcid';

const subProcessors = {
  mapping: _.identity,
  xman: _.identity,
  arcid,
};

// Takes a raw status object and process it for display
// This works like a redux selector with rawStatus as state
export default function statusProcessor(rawStatus) {
  return _.mapValues(rawStatus, (val, key) => {
    if(typeof subProcessors[key] === 'function') {
      return subProcessors[key](val);
    }
    throw new Error(`${key} has no status subprocessor !`);
    return val;
  });
}
