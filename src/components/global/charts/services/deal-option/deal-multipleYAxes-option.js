import changeOption from '../change-option/change-multipleyaxis-option';
import _ from 'lodash';
/**
 * 处理不同维度的下的图表
 * @param {object} option 图表option
 * @param {object} data 图表数据
 * @param {string} categoryAxis 图表中哪个轴作为类目轴（categroy），处理水平显示还是垂直显示
 * @param {string} valueAxis 图表中哪个轴作为数值轴（value），处理水平显示还是垂直显示
 * @param {string} chartType 图表类型
 */

function dealDimensions(option, data, categoryAxis, valueAxis) {
  const xAxisField = data.keys[0];
  const legendFields = data.valueKeys;

  option.$legend.data = legendFields;
  categoryAxis.name = categoryAxis.showName ? (categoryAxis.name || xAxisField) : '';
  categoryAxis.data = data.aggs.map(x => x[xAxisField]);
  legendFields.map((field, index) => {
    option.yAxis.push({
      type: 'value',
      min: valueAxis.min,
      max: valueAxis.max,
      position: index === 0 ? 'left' : 'right',
      offset: index >= 2 ? 80 * (index - 1) : 0,
      name: field,
      nameTextStyle: _.cloneDeep(valueAxis.nameTextStyle),
      axisLabel: _.cloneDeep(valueAxis.axisLabel),
      axisLine: _.cloneDeep(valueAxis.axisLine),
    });
    option.series.push({
      name: field,
      type: index >= 2 ? 'line' : 'bar',
      yAxisIndex: index,
      data: data.aggs.map(data => data[field]),
    });
  });
}

/**
 * 根据不同类型的图表和展示方式处理图表的option
 * @param {object} option 图表option
 * @param {string} displayType 图表展示类型
 * @param {object} data 图表数据
 * @param {string} chartType 图表类型
 */
export default function (option, data) {
  option.xAxis = option.$categoryAxis;

  option.yAxis = [];
  dealDimensions(option, data, option.xAxis, option.$valueAxis);
  changeOption(option, data);
}
