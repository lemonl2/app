import _ from 'lodash';
import { changeLegend } from '../helper/legend';

//处理单值
function dealZeroDimension(option, data) {
  option.$legend.data = data.valueKeys;
  option.series = [{
    name: '',
    type: 'pie',
    label: option.$series.label,
    silent: option.$series.silent,
    radius: '55%',
    center: ['50%', '60%'],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0,0,0,0.5)'
      }
    },
    data: _.map(data.values, (value, name) => ({ name, value })),
  }];
}

//处理一维
function dealOneDimension(option, data) {
  const categoryField = data.keys[0];
  const splitFileds = data.valueKeys;
  option.$legend.data = data.buckets.map(bucket => bucket[categoryField]);
  option.series = splitFileds.map((field, index) => {
    return {
      name: field,
      type: 'pie',
      label: option.$series.label,
      silent: option.$series.silent,
      radius: [0, `${100 / (splitFileds.length + 1) * 1.4}%`],
      center: [`${100 / (splitFileds.length + 1) * (index + 1)}%`, '50%'],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0,0,0,0.5)'
        }
      },
      data: data.buckets.map(bucket => {
        return {
          name: bucket[categoryField],
          value: bucket.values[field]
        };
      }),
    };
  });
}

//处理二维
function dealTwoDimension(option, data) {
  const [categoryField, subCategoryField] = data.keys;
  const splitFileds = data.valueKeys;
  option.$legend.data = data.buckets.map(bucket => bucket[categoryField]);

  option.series = [];

  splitFileds.forEach((field, index) => {
    const catergroySeries = {
      name: field,
      type: 'pie',
      radius: [0, `${100 / (splitFileds.length + 1) * 0.8}%`],
      center: [`${100 / (splitFileds.length + 1) * (index + 1)}%`, '50%'],
      label: {
        normal: {
          show: false,
        }
      },
      silent: option.$series.silent,
      data: data.buckets.map(bucket => {
        return {
          name: bucket[categoryField],
          value: bucket.buckets.map(x => x.values[field]).reduce((preValue, newValue) => preValue + newValue),
        };
      }),
    };
    const subCategorySeries = {
      name: field,
      type: 'pie',
      label: option.$series.label,
      silent: option.$series.silent,
      radius: [`${100 / (splitFileds.length + 1) * 1}%`, `${100 / (splitFileds.length + 1) * 1.5}%`],
      center: [`${100 / (splitFileds.length + 1) * (index + 1)}%`, '50%'],
      data: _.flatten(data.buckets.map(bucket => {
        return bucket.buckets.map(bucket => ({ name: bucket[subCategoryField], value: bucket.values[field], type: 'sub' }));
      })),
    };
    option.series.push(catergroySeries, subCategorySeries);
  });
}


/**
 * 处理pie图的option
 * @param {object} option 图表的option
 * @param {object} data 图表的数据
 */
export default function (option, data) {
  const keys = data.keys;
  switch (keys.length) {
    case 0:
      dealZeroDimension(option, data);
      break;
    case 1:
      dealOneDimension(option, data);
      break;
    case 2:
      dealTwoDimension(option, data);
      break;
    default:
      return '';
  }

  //初始化legend
  option.legend = changeLegend(option.$legend);
}
