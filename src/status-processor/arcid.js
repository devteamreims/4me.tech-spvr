import {
  maxStatus,
} from '../utils/status';

export default function arcidStatusProcessor(rawStatus) {
  console.log('arcid called');
  console.log(rawStatus);

  const items = {
    socketClients: {
      status: 'normal',
      description: 'Realtime socket connections between clients and ARCID backend',
      summary: '30/32 clients',
      more: [
        'Missing clients :',
        'CWP #32',
        'CWP #1',
      ],
      when: Date.now(),
    },
    flightRequest: {
      status: 'warning',
      description: 'Last request by callsign to NM B2B',
      summary: 'Timeout',
      when: Date.now(),
    },
    flightPlanRequest: {
      status: 'normal',
      description: 'Last request by ifplId to NM B2B',
      when: Date.now(),
    },
  };

  return {
    status: maxStatus(_.map(items, i => _.get(i, 'status', 'unknown'))),
    summary: 'Everything is ok',
    when: Date.now(),
    items,
  };

  return rawStatus;
}
