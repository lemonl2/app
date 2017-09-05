export default function () {
  return {
    $orient: 'vertical',
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
    $xAxis: {
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
        truncation: 'right',
      }
    },
    $yAxis: {
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
    },
    $regressiveType: 'linear',
    regressiveShow: true,
  };
}
