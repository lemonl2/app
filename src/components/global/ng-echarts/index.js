import echarts from 'echarts';
import app from 'App';
import './index.scss';
import ResizeObserver from 'resize-observer-polyfill';

const loadingOption = {
  text: '努力加载中',
  color: '#c23531',
  textColor: '#04beb4',
  maskColor: 'rgba(255, 255, 255, 0.8)',
  zlevel: 0
};

class NgEchartsController {
  constructor($scope, $element, config) {
    this.$el = $element[0];
    this.services = { config };
    $scope.$on('echarts:refreshOption', (event, option) => {
      if (option == null || option === this.option) this.refreshOption();
    });
    $scope.$on('echarts:refreshChart', (event, option) => {
      if (option == null || option === this.option) this.refreshChart();
    });
    $scope.$on('echarts:dispatchAction', (event, action, option) => {
      if (option == null || option === this.option) {
        if (!this.chart) {
          console.warn('图表不存在，忽略ing');
          return;
        }
        this.chart.dispatchAction(action);
      }
    });
  }

  refreshOption() {
    if (!this.chart) return;

    if (this.option && Object.keys(this.option).length) {
      this.chart.setOption(this.option, true);
      if (this.$el.clientHeight) this.chart.resize();
      this.chart.hideLoading();
    } else {
      this.chart.showLoading('default', loadingOption);
    }
  }

  refreshChart() {
    const { config } = this.services;
    if (this.chart) {
      this.chart.dispose();
      this.chart = undefined;
    }

    this.chart = echarts.init(this.$el, this.theme || config.get('chart:defaultTheme'));
    this.refreshOption();

    Object.entries(this)
      .filter(([key, value]) => key.startsWith('on') && typeof value === 'function')
      .forEach(([key, value]) => this.chart.on(key.slice('2').toLowerCase(), $event => value({ $event })));
  }

  $postLink() {
    this.refreshChart();
    this.ro = new ResizeObserver(([ entry ]) => {
      if (entry.contentRect.width && entry.contentRect.height && this.chart && !this.resizing) {
        this.resizing = true;
        requestAnimationFrame(() => {
          if (this.chart) this.chart.resize();
          this.resizing = false;
        });
      }
    });

    this.ro.observe(this.$el);
  }

  $onDestroy() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = undefined;
    }
    if (this.ro) {
      this.ro.disconnect();
      this.ro = undefined;
    }
  }

  $onChanges({theme, option}) {
    if (theme && theme.currentValue && !theme.isFirstChange()) {
      this.refreshChart();
    }
    if (option && option.currentValue && !option.isFirstChange()) {
      this.refreshOption();
    }
  }
}
NgEchartsController.$inject = ['$scope', '$element', 'config'];

app
.component('ngEcharts', {
  bindings: {
    // 主题名称
    theme: '<',
    // 自定义参数
    option: '<',

    // http://echarts.baidu.com/api.html#events
    onClick: '&',
    onDblclick: '&',
    onMousedown: '&',
    onMouseup: '&',
    onMouseover: '&',
    onMouseout: '&',
    onGlobalout: '&',

    onDatazoom: '&',
    onDatarangeselected: '&',
    onTimelinechanged: '&',
    onTimelineplaychanged: '&',
    onRestore: '&',
    onDataviewchanged: '&',
    onMagictypechanged: '&',
    onGeoselectchanged: '&',
    onGeoselected: '&',
    onGeounselected: '&',
    onPieselectchanged: '&',
    onPieselected: '&',
    onPieunselected: '&',
    onMapselectchanged: '&',
    onMapselected: '&',
    onMapunselected: '&',
    onAxisareaselected: '&',
    onFocusNodeAdjacency: '&',
    onUnfocusNodeAdjacency: '&',
    onBrush: '&',
    onBrushselected: '&',
  },
  controller: NgEchartsController
});
