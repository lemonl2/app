import { changeLegend } from '../helper/legend';
import { changeCategoryAxis } from '../helper/category';

/**
 * 处理option改变的情况
 * @param {object} option
 * @param {object} data
 */
export default function (option, data) {
  if (!option.$series.polar) {
  //处理水平或者垂直显示 || X，Y轴配置
    const keys = data.keys;
    const xAxisField = keys.length ? keys[0] : '';
    const legendFields = keys.length ? data.valueKeys : ['Count'];
    option.$categoryAxis.name = option.$categoryAxis.showName ? (option.$categoryAxis.name || xAxisField) : '';
    option.$valueAxis.name = option.$valueAxis.showName ? (option.$valueAxis.name || (legendFields.length === 1 ? legendFields[0] : '')) : '';

    switch (option.$orient) {
      case 'horizontal':
        option.xAxis = option.$valueAxis;
        option.yAxis = option.$categoryAxis;
        option.yAxis = changeCategoryAxis(option.$categoryAxis);
        break;
      case 'vertical':
        option.xAxis = option.$categoryAxis;
        option.yAxis = option.$valueAxis;
        option.xAxis = changeCategoryAxis(option.$categoryAxis);
        break;
    }
  }


  //处理图表离容器的距离
  option.grid = {
    top: option.$grid.top || 60,
    right: option.$grid.right || '10%',
    bottom: option.$grid.bottom || 60,
    left: option.$grid.left || '10%',
  };

  //处理legend
  option.legend = changeLegend(option.$legend);

  //显示数据值
  option.series.forEach(item => {
    item.label = option.$series.label;
    item.silent = option.$series.silent;
    if (option.$series.stacked) {
      item.stack = item.$stack;
    } else {
      delete item.stack;
    }
  });

  //dataZoom
  option.dataZoom = option.$dataZoom;
}
