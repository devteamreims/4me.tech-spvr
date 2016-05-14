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
      return _.defaults(
        {},
        subProcessors[key](val),
        {status: "unknown"}
      );
    }
    throw new Error(`${key} has no status subprocessor !`);
    return val;
  });
}

/**
 * Status Object definition :

{
  status: *(oneOf(["normal", "warning", "error", "unknown"])) Status level of said component,
  description: (string) Description of the subitem, what does it do, why does it matter
  summary: *(string/array of strings) Quick summary of what's going on
  more: (string/array of strings) Detailed sentences of what's going on (optional)
  items: (Object of status objects, keyed by name) Subitems following the same pattern
  when: (timestamp) When this state was last reported (optional)
  rawObject: (object) raw response from backend
}

*/
