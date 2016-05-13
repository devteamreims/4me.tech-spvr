import stubStatuses from '../stubStatuses';
import _ from 'lodash';

const xman = () => Promise.delay(3000, stubStatuses.xman);
const arcid = () => Promise.delay(1500, stubStatuses.arcid);
const mapping = () => Promise.delay(2000, stubStatuses.mapping);

export default function fetchStatus() {
  console.log('Refresh started');
  const refreshPromises = {
    xman,
    arcid,
    mapping,
  };

  return Promise.props(_.mapValues(refreshPromises, f => f.call()));
};
