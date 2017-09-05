export default function () {
  return {
    $legend: {
      type: 'scroll',
      show: true,
      position: 'top',
      gap: 0,
      width: '90%',
      textStyle: {
        fontSize: 12,
      },
      truncation: 'right',
      itemGap: 10,
      itemHeight: 14,
      itemWidth: 25,
    },
    $visualMap: {
      min: 0,
      max: 2500,
      left: 'left',
      top: 'bottom',
      text: ['高','低'],
      calculable: true
    },
    $series: {
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      silent: false,
    }
  };
}
