import app from 'App';

app.factory('SplService', ['$http', 'config', ($http, config) => {
  const RootBase = '/api/spl';
  const timestampField = config.get('search:timestampField');
  const maxCount = config.get('search:maxcount');

  function cleanupParams(params) {
    if (!params) return;
    if (Array.isArray(params.timefilter)) {
      [params.start, params.end] = params.timefilter;
      delete params.timefilter;
    }
    if (+params.start) params.start = Math.round(params.start);
    if (+params.end) params.end = Math.round(params.end);

    if (params.pageConf != null) {
      params.from = (params.pageConf.currentPage - 1) * params.pageConf.itemsPerPage;
      params.size = params.pageConf.itemsPerPage;
      delete params.pageConf;
    }
    return params;
  }

  // https://gitlab.eoitek.local/leonlu/eoiq/blob/master/ES-README.md
  return {
    query(spl, params = {}) {
      if (typeof spl !== 'string') throw new TypeError('SplService.query: String expected, but found ' + typeof spl);
      return $http.post(`${RootBase}/rest/query/_q`, Object.assign({
        query: spl,
        size: maxCount,
        format: 'std',
        highlight: false,
      }, cleanupParams(params)));
    },
    queryMulti(spls, params = {}) {
      if (!Array.isArray(spls)) throw new TypeError('SplService.queryMulti: Array expected, but found ' + typeof spl);
      return $http.post(`${RootBase}/rest/query/_mq`, Object.assign({
        queries: spls,
        size: maxCount,
        format: 'std',
        highlight: false,
      }, cleanupParams(params)));
    },
    explain(spl) {
      if (typeof spl !== 'string') throw new TypeError('SplService.explain: String expected, but found ' + typeof spl);
      return $http.post(RootBase + '/rest/query/_explain', { query: spl });
    },
    queryFields(spl, params = {}) {
      if (typeof spl !== 'string') throw new TypeError('SplService.query: String expected, but found ' + typeof spl);
      return $http.post(`${RootBase}/rest/query/_field_stats`, spl, {
        headers: {
          'Content-Type': 'text/plain'
        },
        params: cleanupParams(params),
      });
    },
    queryBuckets(spl, params = {}) {
      if (typeof spl !== 'string') throw new TypeError('SplService.query: String expected, but found ' + typeof spl);
      return $http.post(`${RootBase}/rest/query/_bucket`, spl, {
        headers: {
          'Content-Type': 'text/plain'
        },
        params: Object.assign({
          size: maxCount,
          timefield: timestampField,
          interval: '1M',
          tz: config.get('search:timezone'),
        }, cleanupParams(params))
      });
    },
    explainDrill(spl, name, value) {
      if (typeof spl !== 'string') throw new TypeError('SplService.explain: String expected, but found ' + typeof spl);
      return $http.post(RootBase + '/rest/query/_drill_query', spl, {
        headers: {
          'Content-Type': 'text/plain'
        },
        params: {name, value},
      });
    },
  };
}]);
