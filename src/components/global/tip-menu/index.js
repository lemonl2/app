import app from 'App';
import angular from 'angular';

import './index.scss';

class TipMenuController {
  constructor($scope, $timeout) {
    this.services = { $scope, $timeout };
  }

  scrollTo(id) {
    this.activeSection.name = id;
    document.getElementById(`${id}`).scrollIntoView({ behavior: 'smooth' });
  }

  toggleSectionActive(container) {
    const { $scope } = this.services;
    const anchors = Array.from(document.getElementsByClassName('inpage-anchor'));
    const visibleSection = anchors.find(x => {
      const { top, bottom } = x.getBoundingClientRect();
      return (top <= container.getBoundingClientRect().top && bottom > container.getBoundingClientRect().top);
    });
    this.activeSection.name = visibleSection ? visibleSection.id : '';
    $scope.$apply();
  };

  $onInit() {
    // const container = angular.element(document.getElementById('scroll-container'));
    const { $timeout } = this.services;
    const container = document.getElementById('scroll-container');
    container.addEventListener('scroll', () => { this.toggleSectionActive(container) }, { passive: true });
    // this.toggleSectionActive(container);
  }

}

TipMenuController.$inject = ['$scope','$timeout'];

app.component('tipMenu', {
  template: require('./index.html'),
  bindings: {
    items: '<',
    activeSection: '<',
  },
  controller: TipMenuController,
});
