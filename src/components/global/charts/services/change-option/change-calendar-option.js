import getRange from '../helper/range';
import _ from 'lodash';
import moment from 'moment';

export default function (option, start, end) {
  //处理水平或垂直显示以及日历框大小
  switch (option.$calendar.orient) {
    case 'horizontal': {
      option.visualMap.orient = 'horizontal';
      option.visualMap.left = 'left';
      option.visualMap.top = 'top';
      option.calendar.forEach((item, index) => {
        item.orient = 'horizontal';
        item.left = option.$calendar.left;
        item.top = option.$calendar.top + 180 * index;
        item.cellSize = [option.$calendar.cellSize[0] ? option.$calendar.cellSize[0] : 'auto', option.$calendar.cellSize[1] ? option.$calendar.cellSize[1] : 20];
      });
      break;
    }
    case 'vertical': {
      option.visualMap.orient = 'vertical';
      option.visualMap.left = 'left';
      option.visualMap.top = 'center';
      option.$calendar.left = option.$calendar.left + 80;
      option.calendar.forEach((item, index) => {
        item.orient = 'vertical';
        item.left = option.$calendar.left + 220 * index;
        item.top = option.$calendar.top;
        item.cellSize = [option.$calendar.cellSize[0] ? option.$calendar.cellSize[0] : 20, option.$calendar.cellSize[1] ? option.$calendar.cellSize[1] : 'auto'];
      });
      break;
    }
  }

  //处理语言
  option.calendar.forEach(item => {
    item.monthLabel = _.cloneDeep(option.$language);
    item.dayLabel = _.cloneDeep(option.$language);
  });

  //处理显示
  const range = getRange(start, end);
  range.forEach((item, index) => {
    option.calendar[index].range = option.$showAll ? moment(item[0]).year() : item;
  });

  //最大最小值
  option.visualMap.min = option.$visualMap.min ? option.$visualMap.min : 0;
  option.visualMap.max = option.$visualMap.max ? option.$visualMap.max : 1000;

}
