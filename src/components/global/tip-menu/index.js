import app from 'App';
import angular from 'angular';

import './index.scss';

class TipMenuController {
  constructor($scope, $timeout) {
    this.services = { $scope, $timeout };
    this.container = {};
  }

  scrollTo(id) {
    this.activeSection.name = id;
    document.getElementById(`${id}`).scrollIntoView({ behavior: 'smooth' });
  }

  $onInit() {
    const { $scope, $timeout } = this.services;
    this.container = document.getElementById('scroll-container');
    this.toggleSectionActive = () => {
      const container = this.container;
      const anchors = Array.from(document.getElementsByClassName('inpage-anchor'));
      const visibleSection = anchors.find(x => {
        const { top, bottom } = x.getBoundingClientRect();
        return (top <= container.getBoundingClientRect().top && bottom > container.getBoundingClientRect().top);
      });
      this.activeSection.name = visibleSection ? visibleSection.id : '';
      $scope.$apply();
    }
    this.container.addEventListener('scroll', this.toggleSectionActive, { passive: true });
  }

  $onDestroy() {
    this.container.removeEventListener('scroll', this.toggleSectionActive, { passive: true });
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
