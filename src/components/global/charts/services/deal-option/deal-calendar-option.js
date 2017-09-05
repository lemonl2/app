import changeOption from '../change-option/change-calendar-option';
import getRange from '../helper/range';
import moment from 'moment';
import _ from 'lodash';

export default function (option, data, start, end) {
  option.visualMap = _.cloneDeep(option.$visualMap);
  const range = getRange(start, end);

  function getVirtualData(range) {
    const start = Date.parse(range[0]);
    const end = Date.parse(range[1]);
    const dayTime = moment.duration(1, 'd');
    const sData = [];
    for (let time = start; time < end; time += dayTime) {
      const date = moment(time).format('YYYY-MM-DD');
      const item = data.aggs.find(item => moment(item[data.keys[0]]).format('YYYY-MM-DD') === date);
      if (item) {
        sData.push([date, item[data.valueKeys[0]]]);
      } else {
        sData.push([date, 0]);
      }
    }
    return sData;
  }

  range.forEach((item, index) => {
    option.calendar.push({
      orient: option.$calendar.orient,
      left: option.$calendar.left,
      top: option.$calendar.top + 180 * index,
      range: moment(item[0]).year(),
      cellSize: [option.$calendar.cellSize[0] ? option.$calendar.cellSize[0] : 'auto', option.$calendar.cellSize[1] ? option.$calendar.cellSize[1] : 20],
      monthLabel: _.cloneDeep(option.$calendar.monthLabel),
      dayLabel: _.cloneDeep(option.$calendar.dayLabel),
      yearLabel: _.cloneDeep(option.$calendar.yearLabel)
    });
    option.series.push({
      type: option.$series.type,
      coordinateSystem: 'calendar',
      calendarIndex: index,
      data: getVirtualData(item),
      silent: option.$series.silent
    });
  });

  changeOption(option, start, end);
}
