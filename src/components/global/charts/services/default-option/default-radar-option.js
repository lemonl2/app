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
    $grid: {
      top: 60,
      right: '10%',
      bottom: 60,
      left: '10%',
    },
    $radar: {
      shape: 'polygon',
      max: null,
      min: null,
    },
    $series: {
      label: {
        normal: {
          show: true,
          position: 'outside',
        }
      },
      silent: false,
    }
  };
}
