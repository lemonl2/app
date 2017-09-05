import app from 'App';
import { EchartsThemes } from 'Constant';

import './index.scss';

class multipleyaxesConfigController {
  constructor() {
    this.themes = EchartsThemes;
  }

  optionThemeChange() {
    this.chart.option.$theme = this.chart.theme;
    this.optionChange();
  }

  labelIntervalChange() {
    if (this.chart.option.$categoryAxis.axisLabel.interval === null) this.chart.option.$categoryAxis.axisLabel.interval = 'auto';
    this.optionChange();
  }
}

multipleyaxesConfigController.$inject = [];
app.component('multipleyaxesConfigForm', {
  template: require('./index.html'),
  bindings: {
    chart: '<',
    optionChange: '&',
  },
  controller: multipleyaxesConfigController,
});
