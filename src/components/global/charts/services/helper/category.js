function changeTruncation(categoryAxis) {
  switch (categoryAxis.axisLabel.truncation) {
    case 'right':
      categoryAxis.axisLabel.formatter = (name) => {
        return name.length > 15 ? name.slice(0, 12) + '…' : name;
      };
      break;
    case 'center':
      categoryAxis.axisLabel.formatter = (name) => {
        return name.length > 15 ? name.slice(0, 6) + '…' + name.slice(-6) : name;
      };
      break;
    case 'left':
      categoryAxis.axisLabel.formatter = (name) => {
        return name.length > 15 ? '…' + name.slice(-12) : name;
      };
      break;
    default:
      categoryAxis.axisLabel.formatter = null;
      break;
  }
}

function changeCategoryAxis(categoryAxis) {
  const result = Object.assign({}, categoryAxis);
  changeTruncation(result);
  return result;
}

export {
  changeCategoryAxis,
};
