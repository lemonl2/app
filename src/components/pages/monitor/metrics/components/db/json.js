export default (hostname) => ({
  'timeFilter': ['now-15m', 'now'],
  'theme': 'shine',
  'title': `${hostname} 性能指标`,
  'detail': [{
    'sizeX': 6,
    'sizeY': 3,
    'row': 0,
    'col': 0,
    'content': 'chart',
    'option': {
      'title': '折线图',
      'name': 'line',
      'theme': 'shine',
      'description': '',
      'option': {
        '$orient': 'vertical',
        '$legend': {
          'show': true,
          'position': 'top',
          'gap': 0,
          'width': '90%',
          'textStyle': {
            'fontSize': 12
          },
          'truncation': 'right',
          'itemGap': 10,
          'itemHeight': 14,
          'itemWidth': 25
        },
        '$grid': {
          'top': 60,
          'right': '10%',
          'bottom': 60,
          'left': '10%'
        },
        '$dataZoom': [{
          'type': 'slider',
          'show': false
        }],
        '$categoryAxis': {
          'name': '',
          'nameLocation': 'end',
          'nameTextStyle': {
            'fontSize': 12
          },
          'nameGap': 15,
          'showName': true,
          'inverse': false,
          'axisLabel': {
            'rotate': 0,
            'textStyle': {
              'fontSize': 12
            },
            'interval': 'auto',
            'truncation': 'none'
          }
        },
        '$valueAxis': {
          'name': '',
          'nameLocation': 'end',
          'nameTextStyle': {
            'fontSize': 12
          },
          'nameGap': 15,
          'showName': true,
          'interval': null,
          'min': null,
          'max': null
        },
        '$series': {
          'label': {
            'normal': {
              'show': false,
              'position': 'top'
            }
          },
          'silent': false,
          'stacked': false,
          'polar': false
        }
      }
    },
    'spl': `index=metricbeat* metricset.name=process system.process.name=flow beat.hostname="${hostname}"| stats avg('system.process.cpu.total.pct') as 'CPU使用率' by date_histogram(@timestamp,60s,mincount=1) as '@timestamp'`,
    'title': '采集进程-CPU使用率',
    'searchType': 'aggregation',
  }, {
    'sizeX': 6,
    'sizeY': 3,
    'row': 0,
    'col': 6,
    'content': 'chart',
    'option': {
      'title': '折线图',
      'name': 'line',
      'theme': 'shine',
      'description': '',
      'option': {
        '$orient': 'vertical',
        '$legend': {
          'show': false,
          'position': 'top',
          'gap': 0,
          'width': '90%',
          'textStyle': {
            'fontSize': 12
          },
          'truncation': 'right',
          'itemGap': 10,
          'itemHeight': 14,
          'itemWidth': 25
        },
        '$grid': {
          'top': 60,
          'right': '10%',
          'bottom': 60,
          'left': '10%'
        },
        '$dataZoom': [{
          'type': 'slider',
          'show': false
        }],
        '$categoryAxis': {
          'name': '',
          'nameLocation': 'end',
          'nameTextStyle': {
            'fontSize': 12
          },
          'nameGap': 15,
          'showName': true,
          'inverse': false,
          'axisLabel': {
            'rotate': 0,
            'textStyle': {
              'fontSize': 12
            },
            'interval': 'auto',
            'truncation': 'none'
          }
        },
        '$valueAxis': {
          'name': '',
          'nameLocation': 'end',
          'nameTextStyle': {
            'fontSize': 12
          },
          'nameGap': 15,
          'showName': true,
          'interval': null,
          'min': null,
          'max': null
        },
        '$series': {
          'label': {
            'normal': {
              'show': false,
              'position': 'top'
            }
          },
          'silent': false,
          'stacked': false,
          'polar': false
        }
      }
    },
    'spl': `index=metricbeat* metricset.name=process system.process.name=flow beat.hostname="${hostname}"| stats avg('system.process.memory.rss.pct') as '内存使用率' by date_histogram(@timestamp,60s,mincount=1) as '@timestamp'`,
    'title': '采集进程-内存使用率',
    'searchType': 'aggregation',
  }, {
    'sizeX': 6,
    'sizeY': 3,
    'row': 3,
    'col': 6,
    'content': 'chart',
    'option': {
      'title': '折线图',
      'name': 'line',
      'theme': 'shine',
      'description': '',
      'option': {
        '$orient': 'vertical',
        '$legend': {
          'show': true,
          'position': 'top',
          'gap': 0,
          'width': '90%',
          'textStyle': {
            'fontSize': 12
          },
          'truncation': 'right',
          'itemGap': 10,
          'itemHeight': 14,
          'itemWidth': 25
        },
        '$grid': {
          'top': 60,
          'right': '10%',
          'bottom': 60,
          'left': '10%'
        },
        '$dataZoom': [{
          'type': 'slider',
          'show': false
        }],
        '$categoryAxis': {
          'name': '',
          'nameLocation': 'end',
          'nameTextStyle': {
            'fontSize': 12
          },
          'nameGap': 15,
          'showName': true,
          'inverse': false,
          'axisLabel': {
            'rotate': 0,
            'textStyle': {
              'fontSize': 12
            },
            'interval': 'auto',
            'truncation': 'none'
          }
        },
        '$valueAxis': {
          'name': '',
          'nameLocation': 'end',
          'nameTextStyle': {
            'fontSize': 12
          },
          'nameGap': 15,
          'showName': true,
          'interval': null,
          'min': null,
          'max': null
        },
        '$series': {
          'label': {
            'normal': {
              'show': false,
              'position': 'top'
            }
          },
          'silent': false,
          'stacked': false,
          'polar': false
        }
      }
    },
    'spl': `index=metricbeat* metricset.name=memory beat.hostname="${hostname}"|stats avg('system.memory.actual.used.pct') as '内存使用率' by date_histogram(@timestamp,60s,mincount=1) as '@timestamp'`,
    'title': '服务器-内存使用率',
    'searchType': 'aggregation',
  }, {
    'sizeX': 6,
    'sizeY': 3,
    'row': 3,
    'col': 0,
    'content': 'chart',
    'option': {
      'title': '折线图',
      'name': 'line',
      'theme': 'shine',
      'description': '',
      'option': {
        '$orient': 'vertical',
        '$legend': {
          'show': true,
          'position': 'top',
          'gap': 0,
          'width': '90%',
          'textStyle': {
            'fontSize': 12
          },
          'truncation': 'right',
          'itemGap': 10,
          'itemHeight': 14,
          'itemWidth': 25
        },
        '$grid': {
          'top': 60,
          'right': '10%',
          'bottom': 60,
          'left': '10%'
        },
        '$dataZoom': [{
          'type': 'slider',
          'show': false
        }],
        '$categoryAxis': {
          'name': '',
          'nameLocation': 'end',
          'nameTextStyle': {
            'fontSize': 12
          },
          'nameGap': 15,
          'showName': true,
          'inverse': false,
          'axisLabel': {
            'rotate': 0,
            'textStyle': {
              'fontSize': 12
            },
            'interval': 'auto',
            'truncation': 'none'
          }
        },
        '$valueAxis': {
          'name': '',
          'nameLocation': 'end',
          'nameTextStyle': {
            'fontSize': 12
          },
          'nameGap': 15,
          'showName': true,
          'interval': null,
          'min': null,
          'max': null
        },
        '$series': {
          'label': {
            'normal': {
              'show': false,
              'position': 'top'
            }
          },
          'silent': false,
          'stacked': false,
          'polar': false
        }
      }
    },
    'spl': `index=metricbeat* metricset.name=cpu beat.hostname="${hostname}"| stats avg('system.cpu.user.pct') as 'CPU使用率' by date_histogram(@timestamp,60s,mincount=1) as '@timestamp'`,
    'title': '服务器-CPU使用率',
    'searchType': 'aggregation'
  }, {
    'sizeX': 6,
    'sizeY': 3,
    'row': 6,
    'col': 0,
    'content': 'chart',
    'option': {
      'title': '折线图',
      'name': 'line',
      'theme': 'shine',
      'description': '',
      'option': {
        '$orient': 'vertical',
        '$legend': {
          'show': true,
          'position': 'top',
          'gap': 0,
          'width': '90%',
          'textStyle': {
            'fontSize': 12
          },
          'truncation': 'right',
          'itemGap': 10,
          'itemHeight': 14,
          'itemWidth': 25
        },
        '$grid': {
          'top': 60,
          'right': '10%',
          'bottom': 60,
          'left': '10%'
        },
        '$dataZoom': [{
          'type': 'slider',
          'show': false
        }],
        '$categoryAxis': {
          'name': '',
          'nameLocation': 'end',
          'nameTextStyle': {
            'fontSize': 12
          },
          'nameGap': 15,
          'showName': true,
          'inverse': false,
          'axisLabel': {
            'rotate': 0,
            'textStyle': {
              'fontSize': 12
            },
            'interval': 'auto',
            'truncation': 'none'
          }
        },
        '$valueAxis': {
          'name': '',
          'nameLocation': 'end',
          'nameTextStyle': {
            'fontSize': 12
          },
          'nameGap': 15,
          'showName': true,
          'interval': null,
          'min': null,
          'max': null
        },
        '$series': {
          'label': {
            'normal': {
              'show': false,
              'position': 'top'
            }
          },
          'silent': false,
          'stacked': false,
          'polar': false
        }
      }
    },
    'spl': `index=metricbeat* metricset.name=diskio system.diskio.name=sd* beat.hostname="${hostname}"|stats avg('system.diskio.iostat.read.per_sec.bytes') as '磁盘I/O read (bytes/s)' by date_histogram(@timestamp,1m,mincount=1) as '@timestamp',system.diskio.name`,
    'title': '服务器-磁盘 I/O read',
    'searchType': 'aggregation',
  }, {
    'sizeX': 6,
    'sizeY': 3,
    'row': 6,
    'col': 6,
    'content': 'chart',
    'option': {
      'title': '折线图',
      'name': 'line',
      'theme': 'shine',
      'description': '',
      'option': {
        '$orient': 'vertical',
        '$legend': {
          'show': true,
          'position': 'top',
          'gap': 0,
          'width': '90%',
          'textStyle': {
            'fontSize': 12
          },
          'truncation': 'right',
          'itemGap': 10,
          'itemHeight': 14,
          'itemWidth': 25
        },
        '$grid': {
          'top': 60,
          'right': '10%',
          'bottom': 60,
          'left': '10%'
        },
        '$dataZoom': [{
          'type': 'slider',
          'show': false
        }],
        '$categoryAxis': {
          'name': '',
          'nameLocation': 'end',
          'nameTextStyle': {
            'fontSize': 12
          },
          'nameGap': 15,
          'showName': true,
          'inverse': false,
          'axisLabel': {
            'rotate': 0,
            'textStyle': {
              'fontSize': 12
            },
            'interval': 'auto',
            'truncation': 'none'
          }
        },
        '$valueAxis': {
          'name': '',
          'nameLocation': 'end',
          'nameTextStyle': {
            'fontSize': 12
          },
          'nameGap': 15,
          'showName': true,
          'interval': null,
          'min': null,
          'max': null
        },
        '$series': {
          'label': {
            'normal': {
              'show': false,
              'position': 'top'
            }
          },
          'silent': false,
          'stacked': false,
          'polar': false
        }
      }
    },
    'spl': `index=metricbeat* metricset.name=diskio system.diskio.name=sd* beat.hostname="${hostname}"|stats avg('system.diskio.iostat.write.per_sec.bytes')  as '磁盘I/O read (bytes/s)' by date_histogram(@timestamp,1m,mincount=1) as '@timestamp',system.diskio.name`,
    'title': '服务器-磁盘 I/O write',
    'searchType': 'aggregation',
  }, {
    'sizeX': 6,
    'sizeY': 3,
    'row': 9,
    'col': 0,
    'content': 'chart',
    'option': {
      'title': '折线图',
      'name': 'line',
      'theme': 'shine',
      'description': '',
      'option': {
        '$orient': 'vertical',
        '$legend': {
          'show': true,
          'position': 'top',
          'gap': 0,
          'width': '90%',
          'textStyle': {
            'fontSize': 12
          },
          'truncation': 'right',
          'itemGap': 10,
          'itemHeight': 14,
          'itemWidth': 25
        },
        '$grid': {
          'top': 60,
          'right': '10%',
          'bottom': 60,
          'left': '10%'
        },
        '$dataZoom': [{
          'type': 'slider',
          'show': false
        }],
        '$categoryAxis': {
          'name': '',
          'nameLocation': 'end',
          'nameTextStyle': {
            'fontSize': 12
          },
          'nameGap': 15,
          'showName': true,
          'inverse': false,
          'axisLabel': {
            'rotate': 0,
            'textStyle': {
              'fontSize': 12
            },
            'interval': 'auto',
            'truncation': 'none'
          }
        },
        '$valueAxis': {
          'name': '',
          'nameLocation': 'end',
          'nameTextStyle': {
            'fontSize': 12
          },
          'nameGap': 15,
          'showName': true,
          'interval': null,
          'min': null,
          'max': null
        },
        '$series': {
          'label': {
            'normal': {
              'show': false,
              'position': 'top'
            }
          },
          'silent': false,
          'stacked': false,
          'polar': false
        }
      }
    },
    'spl': `index=metricbeat* metricset.name=network system.network.name=ens* beat.hostname="${hostname}"|stats avg('system.network.in.bytes') as 'Network in (bytes)' by date_histogram(@timestamp,60s,mincount=1) as '@timestamp',system.network.name`,
    'title': '服务器-网络流量 in',
    'searchType': 'aggregation',
  }, {
    'sizeX': 6,
    'sizeY': 3,
    'row': 9,
    'col': 6,
    'appId': 78622657933312,
    'content': 'chart',
    'option': {
      'title': '折线图',
      'name': 'line',
      'theme': 'shine',
      'description': '',
      'option': {
        '$orient': 'vertical',
        '$legend': {
          'show': true,
          'position': 'top',
          'gap': 0,
          'width': '90%',
          'textStyle': {
            'fontSize': 12
          },
          'truncation': 'right',
          'itemGap': 10,
          'itemHeight': 14,
          'itemWidth': 25
        },
        '$grid': {
          'top': 60,
          'right': '10%',
          'bottom': 60,
          'left': '10%'
        },
        '$dataZoom': [{
          'type': 'slider',
          'show': false
        }],
        '$categoryAxis': {
          'name': '',
          'nameLocation': 'end',
          'nameTextStyle': {
            'fontSize': 12
          },
          'nameGap': 15,
          'showName': true,
          'inverse': false,
          'axisLabel': {
            'rotate': 0,
            'textStyle': {
              'fontSize': 12
            },
            'interval': 'auto',
            'truncation': 'none'
          }
        },
        '$valueAxis': {
          'name': '',
          'nameLocation': 'end',
          'nameTextStyle': {
            'fontSize': 12
          },
          'nameGap': 15,
          'showName': true,
          'interval': null,
          'min': null,
          'max': null
        },
        '$series': {
          'label': {
            'normal': {
              'show': false,
              'position': 'top'
            }
          },
          'silent': false,
          'stacked': false,
          'polar': false
        }
      }
    },
    'spl': `index=metricbeat* system.network.name=ens* metricset.name=network beat.hostname="${hostname}"|stats avg('system.network.out.bytes') as 'Network out (bytes)' by date_histogram(@timestamp,60s,mincount=1) as '@timestamp',system.network.name`,
    'title': '服务器-网络流量 out',
    'searchType': 'aggregation',
  }]
});
