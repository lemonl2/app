export default function () {
  return {
    $orient: 'vertical',
    $legend: {
      type: 'scroll',
      show: true,
      position: 'top',
      gap: 0,
      width: '90%',
      itemGap: 10,
      itemHeight: 14,
      itemWidth: 25,
      truncation: 'right',
    },
    $grid: {
      right: '20%',
      top: 60,
      bottom: 60,
      left: '10%',
    },
    $dataZoom: [{
      type: 'slider',
      show: false,
    }],
    $categoryAxis: {
      type: 'category',
      name: '',
      nameLocation: 'end',
      nameGap: 15,
      nameTextStyle: {
        fontSize: 12,
      },
      showName: true,
      inverse: false,
      axisLabel: {
        rotate: 0,
        interval: 'auto',
        textStyle: {
          fontSize: 12,
        },
      },
      data:[],
    },
    $yAxis: [],
    $valueAxis: {
      min: null,
      max: null,
      position: 'left',
      showName: true,
      interval: null,
      name: '',
      nameLocation: 'end',
      nameGap: 15,
      nameTextStyle: {
        fontSize: 12,
      },
      axisLabel: {
        formatter: '{value}',
      },
      axisLine: {
        lineStyle: {
          color: '',
        }
      },
    },
    $colors: [],
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
    $theme: 'shine'
  };
}
