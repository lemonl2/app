import app from 'App';
import './index.scss';

class MetricMiddlewareController {
  constructor() {

  }
}

app.component('metricMiddleware', {
  template: require('./index.html'),
  controller: MetricMiddlewareController
});
