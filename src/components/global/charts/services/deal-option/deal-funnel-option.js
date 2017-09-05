import { changeLegend } from '../helper/legend';

export default function dealDimensions(option, data) {
  const seriesData = data.aggs.map((key) => {
    return {
      value: key[data.valueKeys[0]],
      name: key[data.keys[0]],
    };
  }).sort((a, b) => b.value - a.value);

  // 初始化legend
  option.$legend.data = seriesData.map(o => o.name).map(item => String(item));
  option.legend = changeLegend(option.$legend);
  option.series = option.$series;
  option.series.data = seriesData.filter(x => typeof x.value === 'number');
  option.series.name = data.valueKeys[0];
  option.series.width = '10%';
  option.series.height = '50%';
  option.series.left = '45%';
  option.series.right = '45%';
}
