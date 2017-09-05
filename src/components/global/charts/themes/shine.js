/* eslint-disable */

var colorPalette = [
            "#00b4bf",
            "#2cdbba",
            "#91e041",
            "#eb6093",
            "#ffa27a",
            "#ffd74a"
        ];
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    echarts.registerTheme('shine', {
        "color": colorPalette,
        "backgroundColor": "rgba(255,255,255,0)",
        "textStyle": {},
        "title": {
            "textStyle": {
                "color": "#00b5bf"
            },
            "subtextStyle": {
                "color": "#919191"
            }
        },
        "line": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "2"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "1"
                }
            },
            "symbolSize": "8",
            "symbol": "emptyCircle",
            "smooth": false
        },
        "radar": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "2"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "1"
                }
            },
            "symbolSize": "8",
            "symbol": "emptyCircle",
            "smooth": false
        },
        "bar": {
            "itemStyle": {
                "normal": {
                    "barBorderWidth": "1",
                    "barBorderColor": "#ffffff"
                },
                "emphasis": {
                    "barBorderWidth": "1",
                    "barBorderColor": "#ffffff"
                }
            }
        },
        "pie": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "1",
                    "borderColor": "#ffffff"
                },
                "emphasis": {
                    "borderWidth": "1",
                    "borderColor": "#ffffff"
                }
            }
        },
        "scatter": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "1",
                    "borderColor": "#ffffff"
                },
                "emphasis": {
                    "borderWidth": "1",
                    "borderColor": "#ffffff"
                }
            }
        },
        "boxplot": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "1",
                    "borderColor": "#ffffff"
                },
                "emphasis": {
                    "borderWidth": "1",
                    "borderColor": "#ffffff"
                }
            }
        },
        "parallel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "1",
                    "borderColor": "#ffffff"
                },
                "emphasis": {
                    "borderWidth": "1",
                    "borderColor": "#ffffff"
                }
            }
        },
        "sankey": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "1",
                    "borderColor": "#ffffff"
                },
                "emphasis": {
                    "borderWidth": "1",
                    "borderColor": "#ffffff"
                }
            }
        },
        "funnel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "1",
                    "borderColor": "#ffffff"
                },
                "emphasis": {
                    "borderWidth": "1",
                    "borderColor": "#ffffff"
                }
            }
        },
        "gauge": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "1",
                    "borderColor": "#ffffff"
                },
                "emphasis": {
                    "borderWidth": "1",
                    "borderColor": "#ffffff"
                }
            }
        },
        "candlestick": {
            "itemStyle": {
                "normal": {
                    "color": "#ff84b2",
                    "color0": "#53e8d5",
                    "borderColor": "#ff4285",
                    "borderColor0": "#22c3aa",
                    "borderWidth": "1"
                }
            }
        },
        "graph": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "1",
                    "borderColor": "#ffffff"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "1",
                    "color": "#00ccb4"
                }
            },
            "symbolSize": "8",
            "symbol": "emptyCircle",
            "smooth": false,
            "color": [
                "#00b4bf",
                "#2cdbba",
                "#91e041",
                "#eb6093",
                "#ffa27a",
                "#ffd74a"
            ],
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#ffffff"
                    }
                }
            }
        },
        "map": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#0aa8b3",
                    "borderColor": "#ffffff",
                    "borderWidth": "1"
                },
                "emphasis": {
                    "areaColor": "rgba(34,195,170,0.25)",
                    "borderColor": "#22c3aa",
                    "borderWidth": "1"
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#28544e"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(52,158,142)"
                    }
                }
            }
        },
        "geo": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#0aa8b3",
                    "borderColor": "#ffffff",
                    "borderWidth": "1"
                },
                "emphasis": {
                    "areaColor": "rgba(34,195,170,0.25)",
                    "borderColor": "#22c3aa",
                    "borderWidth": "1"
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#28544e"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(52,158,142)"
                    }
                }
            }
        },
        "categoryAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#1accc1"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#454545"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#f5f5f5"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(199,255,250,0.05)"
                    ]
                }
            }
        },
        "valueAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#1accc1"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#454545"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#f5f5f5"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(199,255,250,0.05)"
                    ]
                }
            }
        },
        "logAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#1accc1"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#454545"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#f5f5f5"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(199,255,250,0.05)"
                    ]
                }
            }
        },
        "timeAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#1accc1"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#454545"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#f5f5f5"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(199,255,250,0.05)"
                    ]
                }
            }
        },
        "toolbox": {
            "iconStyle": {
                "normal": {
                    "borderColor": "#4fc9db"
                },
                "emphasis": {
                    "borderColor": "#00979e"
                }
            }
        },
        "legend": {
            "textStyle": {
                "color": "#4d4d4d"
            }
        },
        "tooltip": {
            "axisPointer": {
                "lineStyle": {
                    "color": "#15c4c4",
                    "width": 1
                },
                "crossStyle": {
                    "color": "#15c4c4",
                    "width": 1
                }
            }
        },
        "timeline": {
            "lineStyle": {
                "color": "#4ea397",
                "width": 1
            },
            "itemStyle": {
                "normal": {
                    "color": "#3bbbc4",
                    "borderWidth": 1
                },
                "emphasis": {
                    "color": "#4ea397"
                }
            },
            "controlStyle": {
                "normal": {
                    "color": "#4ea397",
                    "borderColor": "#4ea397",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "color": "#4ea397",
                    "borderColor": "#4ea397",
                    "borderWidth": 0.5
                }
            },
            "checkpointStyle": {
                "color": "#4ea397",
                "borderColor": "rgba(60,235,210,0.3)"
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#4ea397"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#4ea397"
                    }
                }
            }
        },
        "visualMap": {
            "color": [
                "#b3ff78",
                "#15c4ad"
            ]
        },
        "dataZoom": {
            "backgroundColor": "rgba(255,255,255,0)",
            "dataBackgroundColor": "rgba(222,222,222,1)",
            "fillerColor": "rgba(114,230,212,0.25)",
            "handleColor": "#0dd6bd",
            "handleSize": "100%",
            "textStyle": {
                "color": "#9e9e9e"
            }
        },
        "markPoint": {
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#ffffff"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#ffffff"
                    }
                }
            }
        }
    });
}));

exports.colors = colorPalette;
