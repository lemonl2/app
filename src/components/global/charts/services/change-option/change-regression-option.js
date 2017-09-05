import ecStat from 'echarts-stat';
import { changeCategoryAxis } from '../helper/category';

/**
 * 处理option改变的情况
 * @param {object} option
 * @param {object} data
 */
export default function (option, chartData) {
  //处理水平或者垂直显示 || X，Y轴配置
  option.$xAxis.name = option.$xAxis.showName ? (option.$xAxis.name || chartData.keyName) : '';
  option.$yAxis.name = option.$yAxis.showName ? (option.$yAxis.name || chartData.valueKeyName) : '';

  option.$xAxis.axisLabel.formatter = (value) => {
    return value.length > 15 ? (value.slice(0, 6) + '…' + value.slice(-6)) : value;
  };

  const { data } = chartData;
  option.xAxis = option.$xAxis;
  option.yAxis = option.$yAxis;
  option.xAxis = changeCategoryAxis(option.$xAxis);

  //处理图表离容器的距离
  option.grid = {
    top: option.$grid.top || 60,
    right: option.$grid.right || '10%',
    bottom: option.$grid.bottom || 60,
    left: option.$grid.left || '10%',
  };

  const regression = ecStat.regression(option.$regressiveType, data);
  regression.points.sort((a, b) => a[0] - b[0]);

  option.series.forEach(item => {
    item.label = option.$series.label;
    item.silent = option.$series.silent;
  });

  if (option.$series.regressiveShow) {
    const [, lineSeries] = option.series;
    lineSeries.data = regression.points;
    lineSeries.markPoint.label.normal.formatter = regression.expression;
    lineSeries.markPoint.data = [{
      coord: regression.points[regression.points.length - 1]
    }];
    lineSeries.smooth = option.$regressiveType !== 'linear';
  }

  option.dataZoom = option.$dataZoom;

  // 如果解析回归函数失败，parameter 里包含 NaN 或无穷大
  return !(typeof regression.parameter.coefficient === 'number' && !Number.isFinite(regression.parameter.coefficient))
      && !(typeof regression.parameter.gradient === 'number' && !Number.isFinite(regression.parameter.gradient));
}
