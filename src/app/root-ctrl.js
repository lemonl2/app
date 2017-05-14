import app from 'App';

class RootController {
  constructor($state, $stateRegistry) {
    this.$state = $state;
    this.$stateRegistry = $stateRegistry;
  }
}

RootController.$inject = ['$state', '$stateRegistry'];

app.controller('RootController', RootController);
