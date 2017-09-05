import app from 'App';
import { EchartsThemes } from 'Constant';

import './index.scss';

class CommonConfigController {
  constructor() {
    this.themes = EchartsThemes;
  }

  orientChange(direction) {
    switch (direction) {
      case 'vertical':
        this.chart.option.$series.label.normal.position = 'top';
        this.chart.option.$categoryAxis.inverse = false;
        break;
      case 'horizontal':
        this.chart.option.$series.label.normal.position = 'right';
        this.chart.option.$categoryAxis.inverse = true;
        this.chart.option.$valueAxis.position = 'top';
        break;
    }
    this.optionChange();
  }

  labelIntervalChange() {
    if (this.chart.option.$categoryAxis.axisLabel.interval === null) this.chart.option.$categoryAxis.axisLabel.interval = 'auto';
    this.optionChange();
  }
}

CommonConfigController.$inject = [];
app.component('commonConfigForm', {
  template: require('./index.html'),
  bindings: {
    chart: '<',
    optionChange: '&',
  },
  controller: CommonConfigController,
});
