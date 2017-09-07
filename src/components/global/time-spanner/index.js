import d3 from 'd3';
import app from 'App';
import './index.scss';

class TimeSpannerController {
  constructor($scope, $element) {
    this.element = $element[0];
    this.$scope = $scope;
  }

  draw() {
    const width = this.element.clientWidth;

    const data = this.data;
    const timeExtent = this.timeExtent;
    const specifiedTime = this.specifiedTime;
    const svg = d3.select(this.element).append('svg')
      .attr('width', width)
      .attr('height', 46);

    const x = d3.time.scale()
      .range([0, width])
      .domain(timeExtent);

    // const y = d3.scale.linear()
    //   .range([46, 0])
    //   .domain([0, d3.max(data, d => d.value) * 1.2]);

    // const bgArea = d3.svg.area()
    //   .x(d => x(+d.time))
    //   .y0(46)
    //   .y1(d => y(+d.value));

    // svg.append('path')
    //   .attr('fill', '#D4ECFF')
    //   .datum(data)
    //   .attr('d', bgArea);
    const line = svg.append('line')
      .attr('x1', x(specifiedTime))
      .attr('x2', x(specifiedTime))
      .attr('y1', 0)
      .attr('y2', '100%')
      .attr('stroke-width', 4)
      .attr('stroke', 'rgba(74,182,58,0.38')
      .attr('class', 'specified-time-line');
    // const drag = d3.behavior.drag().origin(() => {
    //   const t = d3.select(line);
    //   return {
    //       x1: t.attr('x1'),
    //       x2: t.attr('x2'),
    //       y1: t.attr('y1'),
    //       y2: t.attr('y2')
    //   };
    // }).on("drag", dragmove);

    // function dragmove(d) {
    //   debugger;
    // }



    const brush = d3.svg.brush().x(x);

    const b = svg.append('g')
      .attr('class', 'x brush')
      .call(brush);

    b.selectAll('rect')
      .attr('height', 46);

    b.selectAll('.resize rect')
      .attr('style', null)
      .attr('width', 12)
      .attr('x', -6);

    b.selectAll('.resize')
      .append('line')
      .attr('x1', -2)
      .attr('y1', 21)
      .attr('x2', 6)
      .attr('y2', 21);
    b.selectAll('.resize')
      .append('line')
      .attr('x1', -2)
      .attr('y1', 23)
      .attr('x2', 6)
      .attr('y2', 23);
    b.select('.resize.w')
      .append('text')
      .attr('y', 23)
      .selectAll('tspan')
      .data(['date', 'time'])
      .enter()
      .append('tspan')
      .attr('class', d => d)
      .attr('x', 0)
      .attr('dy', (d, i) => i ? '1.2em' : 0);
    b.select('.resize.e')
      .append('text')
      .attr('y', 23)
      .selectAll('tspan')
      .data(['date', 'time'])
      .enter()
      .append('tspan')
      .attr('class', d => d)
      .attr('x', 0)
      .attr('dy', (d, i) => i ? '1.2em' : 0);

    b.selectAll('.resize.w line')
      .attr('transform', 'translate(-4 0)');


    const formatDate = d3.time.format('%Y.%m.%d');
    const formatTime = d3.time.format('%I:%M %p');
    const brushText = function (bParent) {
      const [beginning, ending] = brush.extent().map(x => new Date(x));
      bParent.selectAll('.resize.w tspan')
        .data([formatDate(beginning), formatTime(beginning)])
        .attr('x', 0)
        .text(d => d);
      bParent.selectAll('.resize.e tspan')
        .data([formatDate(ending), formatTime(ending)])
        .attr('x', 0)
        .text(d => d);

      const scale = brush.x();
      bParent.classed('text-hidden', scale(ending) - scale(beginning) < 170);
    };

    brush.on('brush', () => {
      b.call(brushText);
    });

    brush.on('brushend', (e) => {
      if (this.ngModel) {
        let extent = brush.extent();
        if (+extent[0] === +extent[1]) {
          extent = x.domain();
        }
        this.ngModel.$setViewValue(extent);
      }
    });

    this.ngModel.$render = () => {
      if (this.ngModel.$viewValue == null) return;
      brush.extent(this.ngModel.$viewValue);
      b.call(brush).call(brushText);
    };

    this.ngModel.$setViewValue(x.domain());
    this.ngModel.$render();
  }

  $onInit() {
    this.draw();
  }
}
TimeSpannerController.$inject = ['$scope', '$element'];

app.component('timeSpanner', {
  bindings: {
    data: '<',
    timeExtent: '<',
    specifiedTime: '<',
  },
  require: {
    ngModel: '?ngModel'
  },
  controller: TimeSpannerController
});
