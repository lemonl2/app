import app from 'App';
import { EchartsThemes } from 'Constant';

import './index.scss';

class RadarConfigController {
  constructor() {
    this.themes = EchartsThemes;
  }
}

RadarConfigController.$inject = [];

app.component('radarConfigForm', {
  template: require('./index.html'),
  bindings: {
    chart: '<',
    optionChange: '&',
  },
  controller: RadarConfigController,
});
