/**
 * 处理option改变的情况
 * @param {object} option
 * @param {object} data
 */
export default function (option, data) {
  if (!option.$series.polar) {
  //处理水平或者垂直显示 || X，Y轴配置
    const keys = data.keys;
    const xAxisField = keys.length ? keys[0] : '';
    const legendFields = keys.length ? data.valueKeys : ['Count'];
    option.$categoryAxis.name = option.$categoryAxis.showName ? (option.$categoryAxis.name || xAxisField) : '';
    option.$valueAxis.name = option.$valueAxis.showName ? (option.$valueAxis.name || (legendFields.length === 1 ? legendFields[0] : '')) : '';

    switch (option.$orient) {
      case 'horizontal':
        option.xAxis = option.$valueAxis;
        option.yAxis = option.$categoryAxis;
        break;
      case 'vertical':
        option.xAxis = option.$categoryAxis;
        option.yAxis = option.$valueAxis;
        break;
    }
  }
  //处理图表离容器的距离
  option.grid = option.$grid;

  //显示数据值
  const color = require(`../../themes/${option.$theme}`).colors;
  option.series.forEach((item, index) => {
    const [, r, g, b ] = /#(\w\w)(\w\w)(\w\w)/.exec(color[index]).map(x => parseInt(x, 16));
    item.label = option.$series.label;
    item.silent = option.$series.silent;
    item.itemStyle.normal.color.colorStops = [{
      offset: 0, color: `rgba(${r}, ${g}, ${b}, 0)`
    }, {
      offset: 1, color: `rgba(${r}, ${g}, ${b}, 1)`
    }];
    if (option.$series.stacked) {
      item.stack = item.$stack;
    } else {
      delete item.stack;
    }
  });

  //dataZoom
  option.dataZoom = option.$dataZoom;
}
