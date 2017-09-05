export default function () {
  return {
    $series: {
      unit: '',
      numberPrecision: 0,
      min: 0,
      max: 1000,
      axisLine: {
        lineStyle: {
          colors: [
            {rate: 0.2, color: '#91c7ae'},
            {rate: 0.8, color: '#63869e'},
            {rate: 1, color: '#c23531'}
          ]
        }
      },
      colors: ['#91c7ae', '#63869e', '#c23531'],
      detail: {
        textStyle: {
          fontSize: 20,
        }
      },
    },
    $legend: {
      type: 'scroll',
      show: false,
    },
    $value: {
      v1: 200,
      v2: 800,
    },
  };
}
