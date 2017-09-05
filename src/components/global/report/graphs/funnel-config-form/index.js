import app from 'App';
import { EchartsThemes } from 'Constant';

import './index.scss';

class FunnelConfigController {
  constructor() {
    this.themes = EchartsThemes;
  }
}

FunnelConfigController.$inject = [];

app.component('funnelConfigForm', {
  template: require('./index.html'),
  bindings: {
    chart: '<',
    optionChange: '&',
  },
  controller: FunnelConfigController,
});
