import app from 'App';

import './index.scss';

app.component('metricConfigForm', {
  template: require('./index.html'),
  bindings: {
    chart: '<',
  },
});
