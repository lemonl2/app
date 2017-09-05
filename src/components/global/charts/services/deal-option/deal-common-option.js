import _ from 'lodash';
import { changeLegend } from '../helper/legend';
import { changeCategoryAxis } from '../helper/category';

/**
 * 处理不同维度的下的图表
 * @param {object} option 图表option
 * @param {object} data 图表数据
 * @param {string} categoryAxis 图表中哪个轴作为类目轴（categroy），处理水平显示还是垂直显示
 * @param {string} valueAxis 图表中哪个轴作为数值轴（value），处理水平显示还是垂直显示
 * @param {string} chartType 图表类型
 */
function dealDimensions(option, data, categoryAxis, valueAxis, chartType) {
  switch (data.keys.length) {
    case 0:
      dealZeroDimension(option, data, categoryAxis, valueAxis, chartType);
      break;
    case 1:
      dealOneDimension(option, data, categoryAxis, valueAxis, chartType);
      break;
    case 2:
      dealTwoDimension(option, data, categoryAxis, valueAxis, chartType);
      break;
    default:
      return '';
  }
}

//处理单值
function dealZeroDimension(option, data, categoryAxis, valueAxis, chartType) {
  categoryAxis.data = data.valueKeys;
  valueAxis.name = valueAxis.showName ? (valueAxis.name || 'Count') : '';
  const series = {
    name: option.$series.polar ? data.valueKeys[0] : 'count',
    type: chartType,
    label: option.$series.label,
    silent: option.$series.silent,
    data: _.values(data.values),
  };
  if (option.$series.polar) {
    option.radiusAxis = {
      type: 'category',
      data: data.valueKeys,
      inverse: true,
      z: 10,
    };
    option.angleAxis = {};
    option.$legend.data = data.valueKeys;
    series.coordinateSystem = 'polar';
  }

  switch (chartType) {
    case 'area':
      series.type = 'line';
      series.areaStyle = {
        normal: {},
      };
      break;
    case 'line':
      series.symbol = 'rect';
      break;
  }
  option.series = [series];
}

//处理一维
function dealOneDimension(option, data, categoryAxis, valueAxis, chartType) {
  const xAxisField = data.keys[0];
  const legendFields = data.valueKeys;
  if (!legendFields.length) throw new TypeError('没有生成值field');
  option.$legend.data = legendFields;
  categoryAxis.name = categoryAxis.showName ? (categoryAxis.name || xAxisField) : '';
  categoryAxis.data = data.buckets.map(x => x[xAxisField]);
  valueAxis.name = valueAxis.showName ? (valueAxis.name || (legendFields.length === 1 ? legendFields[0] : '')) : '';

  if (option.$series.polar) {
    option.angleAxis = {
      type: 'category',
      data: data.buckets.map(x => x[data.keys[0]]),
      z: 10,
      inverse: true,
    };
    option.radiusAxis = {};
  }
  option.series = legendFields.map(field => {
    const series = {
      name: field,
      type: chartType,
      label: option.$series.label,
      silent: option.$series.silent,
      data: data.buckets.map(data => data.values[field]),
    };
    if (option.$series.polar) {
      series.coordinateSystem = 'polar';
    }
    switch (chartType) {
      case 'area':
        series.type = 'line';
        series.areaStyle = {
          normal: {},
        };
        break;
      case 'line':
        series.symbol = 'rect';
        break;
    }
    return series;
  });
}

//处理二维
function dealTwoDimension(option, data, categoryAxis, valueAxis, chartType) {
  const [xAxisField, legendField] = data.keys;
  const stacks = data.valueKeys;
  if (!stacks.length) throw new TypeError('没有生成值field');

  const uniqueFields = data.buckets.map(bucket => bucket[xAxisField]);
  const legends = _.uniq(_.flatten(data.buckets.map(bucket => {
    return bucket.buckets.map(bucket => bucket[legendField]);
  })));
  option.$legend.data = legends.map(item => String(item));
  categoryAxis.name = categoryAxis.showName ? (categoryAxis.name || xAxisField) : '';
  categoryAxis.data = uniqueFields;
  valueAxis.name = valueAxis.showName ? (valueAxis.name || (stacks.length === 1 ? stacks[0] : '')) : '';
  //二维的序列数据
  if (option.$series.polar) {
    option.angleAxis = {
      type: 'category',
      data: data.buckets.map(x => x[xAxisField]),
      z: 10,
      inverse: true,
    };
    option.radiusAxis = {};
  }

  option.series = _.flatten(stacks.map(stack => {
    return legends.map(key => {
      const series = {
        name: key,
        type: chartType,
        label: option.$series.label,
        silent: option.$series.silent,
        $stack: stack,
        data: data.buckets.map(bucket => {
          const foundMatchObject = bucket.buckets.find(bucket => bucket[legendField] === key);
          if (foundMatchObject) return foundMatchObject.values[stack]; //找到就取当前的值
          return 0; //否则返回0填充数组。
        }),
      };
      if (option.$series.polar) {
        series.coordinateSystem = 'polar';
      }
      switch (chartType) {
        case 'area':
          series.type = 'line';
          series.areaStyle = {
            normal: {},
          };
          break;
        case 'line':
          series.symbol = 'rect';
          break;
      }
      return series;
    });
  }));
}



/**
 * 根据不同类型的图表和展示方式处理图表的option
 * @param {object} option 图表option
 * @param {string} displayType 图表展示类型
 * @param {object} data 图表数据
 * @param {string} chartType 图表类型
 */
export default function (option, data, chartType) {

  switch (option.$orient) {
    case 'horizontal':
      option.xAxis = option.$valueAxis;
      option.yAxis = option.$categoryAxis;
      dealDimensions(option, data, option.yAxis, option.xAxis, chartType);
      option.yAxis = changeCategoryAxis(option.$categoryAxis);
      break;
    case 'vertical':
      option.xAxis = option.$categoryAxis;
      option.yAxis = option.$valueAxis;
      dealDimensions(option, data, option.xAxis, option.yAxis, chartType);
      option.xAxis = changeCategoryAxis(option.$categoryAxis);
      break;
  }

  //初始化
  option.legend = changeLegend(option.$legend);

  option.dataZoom = option.$dataZoom;
  option.grid = {
    top: option.$grid.top || 60,
    right: option.$grid.right || '10%',
    bottom: option.$grid.bottom || 60,
    left: option.$grid.left || '10%',
  };

  if (option.$series.polar) {
    option.polar = {};
    delete option.$categoryAxis;
    delete option.$valueAxis;
    delete option.xAxis;
    delete option.yAxis;
    delete option.$orient;
  } else {
    delete option.angleAxis;
    delete option.polar;
    delete option.radiusAxis;
  }
}
