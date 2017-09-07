export default function () {
  return {
    $orient: 'vertical',
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
    $grid: {
      top: 60,
      right: '10%',
      bottom: 60,
      left: '10%',
    },
    $dataZoom: [{
      type: 'slider',
      show: false,
    }],
    $categoryAxis: {
      name: '',
      nameLocation: 'end',
      nameTextStyle: {
        fontSize: 12,
      },
      nameGap: 15,
      showName: true,
      inverse: false,
      axisLabel: {
        rotate: 0,
        textStyle: {
          fontSize: 12,
        },
        interval: 'auto',
        truncation: 'right',
      },
    },
    $valueAxis: {
      name: '',
      nameLocation: 'end',
      nameTextStyle: {
        fontSize: 12,
      },
      nameGap: 15,
      showName: true,
      interval: null,
      min: null,
      max: null,
    },
    $series: {
      label: {
        normal: {
          show: false,
          position: 'top',
        }
      },
      silent: false,
      stacked: false,
      polar: false,
      connectNulls: false
    },
  };
}
