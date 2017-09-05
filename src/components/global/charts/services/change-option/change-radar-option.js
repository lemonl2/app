import { changeLegend } from '../helper/legend';

export default function (option) {

  //处理legend
  option.legend = changeLegend(option.$legend);

  //显示数据值
  option.series.silent = option.$series.silent;
  option.radar.triggerEvent = !option.$series.silent;
  option.series.label = option.$series.label;
  if (option.series.label.normal.position === 'inside') {
    option.series.label.normal.textStyle.color = '#00C2B1';
  } else {
    delete option.series.label.normal.textStyle.color;
  }
  option.radar.shape = option.$radar.shape;
  option.series.data.lineStyle = option.$series.data.lineStyle;
  option.radar.indicator.forEach(item => {
    item.max = option.$radar.max;
    item.min = option.$radar.min;
  });

  //图表离边框的距离
  option.grid = option.$grid;
}
