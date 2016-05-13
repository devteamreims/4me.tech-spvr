export function maxStatus(items) {
  const reduceStatus = (prev, current) => {
    if(current === 'critical' || prev === 'critical' || current === 'error' || prev === 'error') {
      return 'critical';
    }

    if(current === 'warning' || prev === 'warning') {
      return 'warning';
    }

    return 'normal';
  };

  return _.reduce(items, reduceStatus);
}
