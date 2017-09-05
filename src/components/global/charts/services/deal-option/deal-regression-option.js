import changeRegressionOption from '../change-option/change-regression-option';

function dealDimensions(option, data) {
  option.series = [{
    name: 'scatter',
    type: 'scatter',
    label: {
      emphasis: {
        show: true,
        position: 'left',
        textStyle: {
          color: 'blue',
          fontSize: 16
        }
      }
    },
    data: data.data,
  }];

  if (option.$series.regressiveShow) {
    option.series[1] = {
      name: 'line',
      type: 'line',
      showSymbol: false,
      markPoint: {
        itemStyle: {
          normal: {
            color: 'transparent'
          }
        },
        label: {
          normal: {
            show: true,
            position: 'left',
            textStyle: {
              color: '#333',
              fontSize: 14
            }
          }
        },
      }
    };
  }
}

export default function (option, data) {
  dealDimensions(option, data);

  return changeRegressionOption(option, data);
}
