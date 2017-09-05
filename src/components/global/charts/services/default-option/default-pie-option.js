export default function () {
  return {
    $legend: {
      type: 'scroll',
      show: false,
      orient: 'horizontal',
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
