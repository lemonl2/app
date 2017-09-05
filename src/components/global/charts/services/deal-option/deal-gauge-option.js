export default function (option, data) {
  if (option.$legend.show) {
    option.$series.axisLine.lineStyle.color = [
      [(option.$value.v1 - option.$series.min) / (option.$series.max - option.$series.min), option.$series.colors[0]],
      [(option.$value.v2 - option.$series.min) / (option.$series.max - option.$series.min), option.$series.colors[1]],
      [1, option.$series.colors[2]]
    ];
  } else {
    option.$series.axisLine.lineStyle.color = [
      [option.$series.axisLine.lineStyle.colors[0].rate, option.$series.axisLine.lineStyle.colors[0].color],
      [option.$series.axisLine.lineStyle.colors[1].rate, option.$series.axisLine.lineStyle.colors[1].color],
      [option.$series.axisLine.lineStyle.colors[2].rate, option.$series.axisLine.lineStyle.colors[2].color],
    ];
  }

  option.series = [{
    name: '',
    type: 'gauge',
    min: option.$series.min,
    max: option.$series.max,
    axisLine: {
      lineStyle: {
        width: 10,
        color: option.$series.axisLine.lineStyle.color,
      }
    },
    pointer: {
      width: 5,
    },
    axisLabel: {
      distance: 2,
    },
    detail: {
      formatter: function (value) {
        return value.toFixed(option.$series.numberPrecision) + option.$series.unit;
      },
      textStyle: {
        fontSize: option.$series.detail.textStyle.fontSize,
      },
    },
    data: data.result,
  }];
}
