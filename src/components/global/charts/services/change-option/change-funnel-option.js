import { changeLegend } from '../helper/legend';

export default function (option) {
//处理legend
  option.legend = changeLegend(option.$legend);

// 显示数据值
  option.series.silent = option.$series.silent;
  option.series.label = option.$series.label;
  option.series.funnelAlign = option.$series.funnelAlign;
  option.series.sort = option.$series.sort;
  option.series.gap = option.$series.gap;
  option.series.width = option.$series.width || '10%';
  option.series.height = option.$series.height || '50%';
  option.series.left = option.$series.left || '45%';
  option.series.right = option.$series.right || '45%';
}
