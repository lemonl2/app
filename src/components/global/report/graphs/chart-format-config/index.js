import app from 'App';

import './index.scss';

app.component('chartFormatConfig', {
  template: require('./index.html'),
  bindings: {
    chart: '=',
    optionChange: '&',
    popoverIsOpen: '=?',
    popoverPlacement: '@',
  },
});
