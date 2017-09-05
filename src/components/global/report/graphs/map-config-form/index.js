import app from 'App';
import { EchartsThemes } from 'Constant';

import './index.scss';

class mapConfigController {
  constructor() {
    this.themes = EchartsThemes;
  }
}

mapConfigController.$inject = [];
app.component('mapConfigForm', {
  template: require('./index.html'),
  bindings: {
    chart: '<',
    optionChange: '&',
  },
  controller: mapConfigController,
});
