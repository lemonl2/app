import app from 'App';
import './index.scss';

app.component('reminder', {
  bindings: {
    type: '<',
  },
  template: require('./index.html')
});
