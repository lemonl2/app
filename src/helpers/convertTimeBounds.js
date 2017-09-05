import moment from 'moment';
import parseTime from './parseTime';

export default function convertTimeBounds(timeFilter) {
  const [ start, end ] = timeFilter.map(parseTime);

  return {
    min: start.timestamp,
    max: end.timestamp,
    duration: moment.duration(end.timestamp - start.timestamp),
  };
}
