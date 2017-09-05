export default function () {
  return {
    $orient: 'vertical',
    $tooltip: {
      position: 'right',
      show: true,
      formatter: ''
    },
    $legend: {
      type: 'scroll',
      right: 10,
      data: []
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
      name: '',
      data: '',
      symbolSize: '',
      type: 'scatter',
      itemStyle: {
        normal: {
          shadowBlur: 10,
          shadowBlurColor: 'rgba(120, 36, 50, 0.5)',
          shadowOffsetY: 5,
          color: {}
        }
      },
      label: {
        emphasis: {
          show: true,
          position: 'top',
          formatter: '',
        }
      },
      silent: false,
      polar: false,
    },
  };
}
