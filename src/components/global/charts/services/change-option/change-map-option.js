import { changeLegend } from '../helper/legend';

export default function (option, data) {
  //处理legend
  option.legend = changeLegend(option.$legend);

  //最大最小值
  option.visualMap.min = option.$visualMap.min ? option.$visualMap.min : 0;
  option.visualMap.max = option.$visualMap.max ? option.$visualMap.max : 1000;

  //显示数据值
  option.series.forEach(item => {
    item.label = option.$series.label;
    item.silent = option.$series.silent;
  });

  option.tooltip = {
    trigger: 'item',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    },
    formatter: (redata) => {
      let tip = '';
      const key = data.keys[0];
      const bucket = data.buckets.find(x => x[key] === redata.name);
      if (bucket) {
        Object.entries(bucket.values)
          .map(([key, value]) => `${key}: ${value}`)
          .forEach(item => {
            tip += `${item}<br />`;
          });
      } else {
        data.valueKeys.forEach(item => {
          tip += `${item}: 0<br />`;
        });
      }
      return `${redata.name}<br />${tip}`;
    }
  };
}
