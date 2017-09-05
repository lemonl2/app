import moment from 'moment';

//涉及到不同年份时按年分段处理
export default function (start, end) {
  start = moment(start);
  end = moment(end);
  const dlt = end.year() - start.year();
  switch (dlt) {
    case 0:
      return [
        [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')]
      ];
    case 1:
      return [
        [end.format('YYYY-01-01'), end.format('YYYY-MM-DD')],
        [start.format('YYYY-MM-DD'), end.format('YYYY-01-01')]
      ];
    case 2:
      return [
        [end.format('YYYY-01-01'), end.format('YYYY-MM-DD')],
        [end.format('YYYY') - 1 + '-01-01', end.format('YYYY-01-01')],
        [start.format('YYYY-MM-DD'), end.format('YYYY') - 1 + '-01-01']
      ];
    case 3:
      return [
        [end.format('YYYY-01-01'), end.format('YYYY-MM-DD')],
        [end.format('YYYY') - 1 + '-01-01', end.format('YYYY-01-01')],
        [end.format('YYYY') - 2 + '-01-01', end.format('YYYY') - 1 + '-01-01'],
        [start.format('YYYY-MM-DD'), end.format('YYYY') - 2 + '-01-01']
      ];
    case 4:
      return [
        [end.format('YYYY-01-01'), end.format('YYYY-MM-DD')],
        [end.format('YYYY') - 1 + '-01-01', end.format('YYYY-01-01')],
        [end.format('YYYY') - 2 + '-01-01', end.format('YYYY') - 1 + '-01-01'],
        [end.format('YYYY') - 3 + '-01-01', end.format('YYYY') - 2 + '-01-01'],
        [start.format('YYYY-MM-DD'), end.format('YYYY') - 3 + '-01-01']
      ];
    case 5:
      return [
        [end.format('YYYY-01-01'), end.format('YYYY-MM-DD')],
        [end.format('YYYY') - 1 + '-01-01', end.format('YYYY-01-01')],
        [end.format('YYYY') - 2 + '-01-01', end.format('YYYY') - 1 + '-01-01'],
        [end.format('YYYY') - 3 + '-01-01', end.format('YYYY') - 2 + '-01-01'],
        [end.format('YYYY') - 4 + '-01-01', end.format('YYYY') - 3 + '-01-01'],
        [start.format('YYYY-MM-DD'), end.format('YYYY') - 4 + '-01-01']
      ];
  }
}
