import app from 'App';
import _ from 'lodash';
import './index.scss';

class DashboardInputsController {
  constructor($scope, $uibModal, $timeout) {
    this.services = { $scope, $uibModal, $timeout };
  }

  $onInit() {
    const { $scope } = this.services;

    this.gridsterOptions = {
      margins: [10, 10],
      columns: 12,
      swapping: true,
      outerMargin: false,
      rowHeight: 5,
      minSizeY: 19,
      draggable: {
        enabled: true,
        handle: '.box-header > h3'
      },
      //   N
      // W   E
      //   S
      resizable: {
        enabled: true,
        handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
      },
    };

    this.inputs.forEach(x => {
      if (!x.condition) return; // 开始搜索按钮无 condition，忽略之

      x.value = x.condition.defaultValue;

      try {
        const oldReportLength = x.condition.reports.length;

        // 清理脏数据（某报表已经被删除，但是这个输入条件还关联那个panel）
        _.remove(x.condition.reports, reportId => {
          return !this.detail.some(panel => panel.detailId === reportId);
        });

        if (oldReportLength !== x.condition.reports.length) {
          console.warn(`删除了 ${oldReportLength - x.condition.reports.length} 个异常报表`);
        }
      } catch (e) {
        console.error('处理报表异常：', e);
      }
    });

    $scope.$on('dashboard:widgetRemoved', widget => {
      this.cleanupReport(widget);
    });
  }

  removeInput(input) {
    _.pull(this.inputs, input);
    this.onSearch({ $input: input, type: 'inputRemove' });
  }

  editInput(input, index) {
    const { $uibModal } = this.services;

    $uibModal.open({
      component: input.type === 'button' ? 'editDashboardButton' : 'editDashboardInput',
      resolve: {
        input: () => _.cloneDeep(input),
        dashboard: () => this.detail.map(report => ({
          title: report.title,
          id: report.detailId,
        })),
        timefilter: () => this.timefilter,
      },
    }).result
    .then(input => {
      this.inputs[index] = input;
      this.onSearch({ $input: input, type: 'inputChange' });
    })
    .catch(() => {});
  }

  cleanupReport(widget) {
    this.inputs.forEach(input => {
      _.pull(input.condition.reports, widget.detailId);
    });
  }
}

DashboardInputsController.$inject = ['$scope', '$uibModal', '$timeout'];

app.component('dashboardInputs', {
  template: require('./index.html'),
  bindings: {
    detail: '<',
    inputs: '<',
    onInputRemove: '&',
    onSearch: '&',
    editing: '<',
    timefilter: '<',
  },
  controller: DashboardInputsController,
});
