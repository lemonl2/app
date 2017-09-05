import { changeLegend } from '../helper/legend';
import { changeCategoryAxis } from '../helper/category';

export default function (option, data) {
  option.$colors = require(`../../themes/${option.$theme}`).colors;
  //处理 X，Y轴配置
  const xAxisField = data.keys.length ? data.keys[0] : '';
  option.$categoryAxis.name = option.$categoryAxis.showName ? (option.$categoryAxis.name || xAxisField) : '';
  option.xAxis = option.$categoryAxis;
  option.xAxis = changeCategoryAxis(option.$categoryAxis);


  option.yAxis.forEach((item, index) => {
    item.showName = option.$valueAxis.showName;
    item.nameTextStyle.fontSize = option.$valueAxis.nameTextStyle.fontSize;
    item.nameLocation = option.$valueAxis.nameLocation;
    item.nameGap = option.$valueAxis.nameGap;
    item.interval = option.$valueAxis.interval;
    item.axisLine.lineStyle.color = option.$colors[index];
  });
  //显示数据
  option.series.forEach(item => {
    item.label = option.$series.label;
    item.silent = option.$series.silent;
    item.stack = item.$stack;
  });

  //处理图表离容器的距离
  option.grid = {
    top: option.$grid.top || 60,
    right: option.$grid.right || '20%',
    bottom: option.$grid.bottom || 60,
    left: option.$grid.left || '10%',
  };

  //处理legend
  option.legend = changeLegend(option.$legend);

  //dataZoom
  option.dataZoom = option.$dataZoom;
}
