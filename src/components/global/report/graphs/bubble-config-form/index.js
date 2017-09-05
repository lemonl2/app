import app from 'App';
import { EchartsThemes } from 'Constant';

import './index.scss';

class BubbleConfigController {
  constructor() {
    this.themes = EchartsThemes;
  }

  optionThemeChange() {
    this.chart.option.$theme = this.chart.theme;
    this.optionChange();
  }

  orientChange(direction) {
    switch (direction) {
      case 'vertical':
        this.chart.option.$series.label.emphasis.position = 'top';
        this.chart.option.$categoryAxis.inverse = false;
        break;
      case 'horizontal':
        this.chart.option.$series.label.emphasis.position = 'right';
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

BubbleConfigController.$inject = [];

app.component('bubbleConfigForm', {
  template: require('./index.html'),
  bindings: {
    chart: '<',
    optionChange: '&',
  },
  controller: BubbleConfigController,
});
