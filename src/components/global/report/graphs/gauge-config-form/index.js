import app from 'App';
import {EchartsThemes} from 'Constant';

import './index.scss';

class GaugeConfigController {
  constructor() {
    this.themes = EchartsThemes;
  }
}

GaugeConfigController.$inject = [];

app.component('gaugeConfigForm', {
  template: require('./index.html'),
  bindings: {
    chart: '<',
    optionChange: '&',
  },
  controller: GaugeConfigController,
});
