/**
 * 根据图表的legend方位处理option
 */
function _changeLegendPosition(legend) {
  switch (legend.position) {
    case 'top':
      legend.top = 0;
      break;
    case 'right':
      legend.orient = 'vertical';
      legend.right = 'right';
      legend.top = 'center';
      break;
    case 'bottom':
      legend.bottom = 0;
      break;
    case 'left':
      legend.orient = 'vertical';
      legend.left = 'left';
      legend.top = 'center';
      break;
  }
}

/**
 * 根据截取的情况处理legend
 */
function _changeLegendTruncation(legend) {
  switch (legend.truncation) {
    case 'right':
      legend.formatter = (name) => {
        return name.length > 15 ? name.slice(0, 12) + '…' : name;
      };
      break;
    case 'center':
      legend.formatter = (name) => {
        return name.length > 15 ? name.slice(0, 6) + '…' + name.slice(-6) : name;
      };
      break;
    case 'left':
      legend.formatter = (name) => {
        return name.length > 15 ? '…' + name.slice(-12) : name;
      };
      break;
    default:
      legend.formatter = null;
      break;
  }
}

/**
 * 处理legend离轴的距离
 */
function _changeLegendGap(legend) {
  switch (legend.position) {
    case 'top':
      legend.top = legend.gap;
      break;
    case 'right':
      legend.right = legend.gap;
      break;
    case 'bottom':
      legend.bottom = legend.gap;
      break;
    case 'left':
      legend.left = legend.gap;
      break;
  }
}

/**
 * 初始化legend的位置
 */
function _initLegendPosition(legend) {
  delete legend.orient;
  delete legend.right;
  delete legend.left;
  delete legend.top;
  delete legend.bottom;
}

/**
 * 处理图表的图例
 * @param {object} legend
 */
function changeLegend(legend) {
  const result = Object.assign({}, legend);
  _initLegendPosition(result);
  _changeLegendPosition(result);
  _changeLegendTruncation(result);
  _changeLegendGap(result);
  return result;
}

export {
  changeLegend,
};
