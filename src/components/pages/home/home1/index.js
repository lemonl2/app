import app from 'App';
import './index.scss';
class HomeOneController {
  construtor() {

  }
}

HomeOneController.$inject = [];

app
  .component('homeOne', {
  template: require('./index.html'),
  controller: HomeOneController,
})
 .config(['$stateProvider', function($stateProvider) {
   $stateProvider.state({
     name: 'home1',
     url: 'home/home1',
     component: 'homeOne',
   });
 }]);
