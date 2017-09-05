import changeOption from '../change-option/change-map-option';
import _ from 'lodash';

export default function dealDimensions(option, data) {
  option.visualMap = _.cloneDeep(option.$visualMap);
  if (data.buckets) {
    const seriesData = data.valueKeys.map(item => {
      return {
        name: item,
        type: 'map',
        mapType: 'china',
        roam: true,
        label: option.$series.label,
        itemStyle: {
          normal: {
            show: true,
            borderColor: '#D3D3D3'
          },
        },
        silent: option.$series.silent,
        data: data.buckets.map(bucket => {
          return {
            name: bucket[data.keys[0]],
            value: bucket.values[item]
          };
        }),
      };
    });

    option.series = seriesData;
    //初始化legend
    option.$legend.data = data.valueKeys;

    changeOption(option, data);
  }
}
