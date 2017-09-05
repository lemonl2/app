import _ from 'lodash';
import { changeLegend } from '../helper/legend';

function dealDimensions(option, data) {
  switch (data.keys.length) {
    case 1:
      dealOneDimension(option, data);
      break;
    case 2:
      dealTwoDimension(option, data);
      break;
    default:
      return '';
  }
}

// 处理一维
function dealOneDimension(option, data) {
  option.xAxis.name = Object.entries(data.buckets[0].values)[0][0];
  option.yAxis.name = Object.entries(data.buckets[0].values)[1][0];

  //处理气泡颜色
  const color = require(`../../themes/${option.$theme}`).colors;
  const [, r, g, b ] = /#(\w\w)(\w\w)(\w\w)/.exec(color[0]).map(x => parseInt(x, 16));

  option.series.push({
    type: 'scatter',
    name: data.valueKeys[0],
    label: _.cloneDeep(option.$series.label),
    silent: option.$series.silent,
    itemStyle: {
      normal: {
        shadowBlur: option.$series.itemStyle.normal.shadowBlur,
        shadowBlurColor: option.$series.itemStyle.normal.shadowBlurColor,
        shadowOffsetY: option.$series.itemStyle.normal.shadowOffsetY,
        color: {
          type: 'radial',
          x: 0.4,
          y: 0.3,
          r: 1,
          colorStops: [{
            offset: 0, color: `rgba(${r}, ${g}, ${b}, 0)`
          }, {
            offset: 1, color: `rgba(${r}, ${g}, ${b}, 1)`
          }],
          globalCoord: false
        }
      }
    },
    symbolSize: function (params) {
      if (data.valueKeys.length > 2) {
        return Math.sqrt(params[2]);
      } else {
        return 60;
      }
    },
    data: data.buckets.map(item => {
      const arr = _.values(item.values);
      arr.push(item[data.keys[0]]);
      return arr;
    }),
  });

  option.tooltip = {
    position: option.$tooltip.position,
    show: option.$tooltip.show,
    formatter: (redata) => {
      const key = data.keys[0];
      const bucket = data.buckets.find(x => x[key] === redata.data[redata.data.length - 1]);
      let tip = `${key}: ${bucket[key]}<br />`;

      Object.entries(bucket.values)
        .map(([key, value]) => `${key}: ${value}`)
        .forEach(item => {
          tip += `${item}<br />`;
        });
      return `${tip}`;
    }
  };
}

//处理二维
function dealTwoDimension(option, data) {
  option.xAxis.name = Object.entries(data.buckets[0].buckets[0].values)[0][0];
  option.yAxis.name = Object.entries(data.buckets[0].buckets[0].values)[1][0];

  option.$legend.data = data.buckets.map(x => x[data.keys[0]]).map(item => String(item));

  const color = require(`../../themes/${option.$theme}`).colors;

  data.buckets.forEach((bucket, index) => {
    const [, r, g, b ] = /#(\w\w)(\w\w)(\w\w)/.exec(color[index]).map(x => parseInt(x, 16));
    option.series.push({
      name: bucket[data.keys[0]],
      data: bucket.buckets.map(item => {
        const arr = _.values(item.values);
        arr.push(bucket[data.keys[0]]);
        arr.push(item[data.keys[1]]);
        return arr;
      }),
      type: 'scatter',
      symbolSize: function (params) {
        if (data.valueKeys.length > 2) {
          return Math.sqrt(params[2]);
        } else {
          return 60;
        }
      },
      label: {
        emphasis: {
          show: option.$series.label.emphasis.show,
          position: option.$series.label.emphasis.position,
          formatter: bucket[data.keys[0]],
        }
      },
      silent: option.$series.silent,
      itemStyle: {
        normal: {
          shadowBlur: option.$series.itemStyle.normal.shadowBlur,
          shadowBlurColor: option.$series.itemStyle.normal.shadowBlurColor,
          shadowOffsetY: option.$series.itemStyle.normal.shadowOffsetY,
          color: {
            type: 'radial',
            x: 0.4,
            y: 0.3,
            r: 1,
            colorStops: [{
              offset: 0, color: `rgba(${r}, ${g}, ${b}, 0)`
            }, {
              offset: 1, color: `rgba(${r}, ${g}, ${b}, 1)`
            }],
            globalCoord: false
          }
        }
      },
    });
  });

  option.tooltip = {
    position: option.$tooltip.position,
    show: option.$tooltip.show,
    formatter: function (redata) {
      const key = data.keys[0];
      const subbucket = data.buckets.find(x => x[key] === redata.seriesName).buckets.find(y => y[data.keys[1]] === redata.data[redata.data.length - 1]);
      let tip = `${key}:${redata.seriesName}<br />${data.keys[1]}:${subbucket[data.keys[1]]}<br />`;

      Object.entries(subbucket.values)
        .map(([key, value]) => `${key}: ${value}`)
        .forEach(item => {
          tip += `${item}<br />`;
        });
      return `${tip}`;
    }
  };
}


export default function (option, data) {
  switch (option.$orient) {
    case 'horizontal':
      option.xAxis = option.$valueAxis;
      option.yAxis = option.$categoryAxis;
      dealDimensions(option, data);
      break;
    case 'vertical':
      option.xAxis = option.$categoryAxis;
      option.yAxis = option.$valueAxis;
      dealDimensions(option, data);
      break;
  }

  //初始化
  option.legend = changeLegend(option.$legend);
}
