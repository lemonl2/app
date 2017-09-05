import { changeLegend } from '../helper/legend';
/**
 * 处理option改变的情况
 * @param {object} option
 */
export default function (option) {

  //处理legend
  option.legend = changeLegend(option.$legend);

  //显示数据值
  option.series.forEach(item => {
    item.label = option.$series.label;
    item.silent = option.$series.silent;
  });
}
