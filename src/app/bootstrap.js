import deferredBootstrapper from 'angular-deferred-bootstrap';

deferredBootstrapper.bootstrap({
  element: document.documentElement,
  module: 'app',
  bootstrapConfig: {
    strictDi: true
  },
});
