import { changeLegend } from '../helper/legend';

export default function dealDimensions(option, data) {
  if (data.keys.length === 1) {
    const seriesData = data.valueKeys.map((key) => {
      return {
        value: data.aggs.map(item => item[key]),
        name: key,
        lineStyle: {
          normal: {
            type: 'solid'
          }
        },
      };
    });

    //初始化legend
    option.$legend.data = data.valueKeys;
    option.legend = changeLegend(option.$legend);

    option.radar = option.$radar;
    option.radar.triggerEvent = !option.$series.silent;
    option.radar.indicator = data.aggs.map(item => ({
      text: item[data.keys[0]],
      max: option.$radar.max,
      min: option.$radar.min
    }));
    option.series = option.$series;
    option.series.data = seriesData;

    option.grid = option.$grid;
  }
}
