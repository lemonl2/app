import app from 'App';
import './index.scss';
class LeftAsideController {
  constructor($element) {
  }

  $onInit() {
    this.$el = $('#accordion') || {};
    let links = this.$el.find('.link');
    links.on('click', {
      el: this.$el,
    }, this.dropdown);
  }

  dropdown(e) {
    let $el = e.data.el;
    let $this = $(this);
    let $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');
    $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
  }

}

LeftAsideController.$inject = ['$element'];

app.component('leftAside', {
  template: require('./index.html'),
  controller: LeftAsideController,
});
