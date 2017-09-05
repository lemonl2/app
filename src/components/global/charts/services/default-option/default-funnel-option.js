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
    $series: {
      width: '10%',
      height: '50%',
      left: '45%',
      right: '45%',
      label: {
        normal: {
          position: 'right'
        }
      },
      funnelAlign: 'center',
      sort: 'descending',
      silent: false,
      gap: 0,
    }
  };
}
