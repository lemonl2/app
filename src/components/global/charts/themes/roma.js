/* eslint-disable */

var colorPalette = [
            "#f03e6f",
            "#1143bd",
            "#ffb907",
            "#02b56c",
            "#a8e02f",
            "#4ee0a2",
            "#f3d999",
            "#ff6b97",
            "#edc676",
            "#5d7fd4",
            "#82b6e9",
            "#ff6347",
            "#a092f1",
            "#0a915d",
            "#eaf889",
            "#6699ff",
            "#ff6666",
            "#25cf71"
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
    echarts.registerTheme('roma', {
        "color": colorPalette,
        "backgroundColor": "rgba(0,0,0,0)",
        "textStyle": {},
        "title": {
            "textStyle": {
                "color": "#182361"
            },
            "subtextStyle": {
                "color": "#aaaaaa"
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
                    "width": 2
                }
            },
            "symbolSize": "6",
            "symbol": "emptyCircle",
            "smooth": true
        },
        "radar": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "2"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": 2
                }
            },
            "symbolSize": "6",
            "symbol": "emptyCircle",
            "smooth": true
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
                    "color": "#e01f54",
                    "color0": "#001852",
                    "borderColor": "#a64512",
                    "borderColor0": "#117a4e",
                    "borderWidth": 1
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
                    "width": 1,
                    "color": "#a8b0ff"
                }
            },
            "symbolSize": "6",
            "symbol": "emptyCircle",
            "smooth": true,
            "color": [
                "#f03e6f",
                "#1143bd",
                "#ffb907",
                "#02b56c",
                "#a8e02f",
                "#4ee0a2",
                "#f3d999",
                "#ff6b97",
                "#edc676",
                "#5d7fd4",
                "#82b6e9",
                "#ff6347",
                "#a092f1",
                "#0a915d",
                "#eaf889",
                "#6699ff",
                "#ff6666",
                "#25cf71"
            ],
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#eeeeee"
                    }
                }
            }
        },
        "map": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#eeeeee",
                    "borderColor": "#444444",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "rgba(255,215,0,0.8)",
                    "borderColor": "#444444",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#000000"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(100,0,0)"
                    }
                }
            }
        },
        "geo": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#eeeeee",
                    "borderColor": "#444444",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "rgba(255,215,0,0.8)",
                    "borderColor": "#444444",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#000000"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(100,0,0)"
                    }
                }
            }
        },
        "categoryAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#2843a8"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                    "color": "#9c9c9c"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#333"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#ebebeb"
                    ]
                }
            },
            "splitArea": {
                "show": true,
                "areaStyle": {
                    "color": [
                        "rgba(232,235,255,0.3)"
                    ]
                }
            }
        },
        "valueAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#333"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#ccc"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                }
            }
        },
        "logAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#333"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#bdbdbd"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                }
            }
        },
        "timeAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#333"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#ccc"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                }
            }
        },
        "toolbox": {
            "iconStyle": {
                "normal": {
                    "borderColor": "#999999"
                },
                "emphasis": {
                    "borderColor": "#666666"
                }
            }
        },
        "legend": {
            "textStyle": {
                "color": "#333333"
            }
        },
        "tooltip": {
            "axisPointer": {
                "lineStyle": {
                    "color": "#cccccc",
                    "width": 1
                },
                "crossStyle": {
                    "color": "#cccccc",
                    "width": 1
                }
            }
        },
        "timeline": {
            "lineStyle": {
                "color": "#293c55",
                "width": 1
            },
            "itemStyle": {
                "normal": {
                    "color": "#293c55",
                    "borderWidth": 1
                },
                "emphasis": {
                    "color": "#a9334c"
                }
            },
            "controlStyle": {
                "normal": {
                    "color": "#293c55",
                    "borderColor": "#293c55",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "color": "#293c55",
                    "borderColor": "#293c55",
                    "borderWidth": 0.5
                }
            },
            "checkpointStyle": {
                "color": "#e43c59",
                "borderColor": "rgba(194,53,49,0.5)"
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#293c55"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#293c55"
                    }
                }
            }
        },
        "visualMap": {
            "color": [
                "#e01f54",
                "#ffe6b2"
            ]
        },
        "dataZoom": {
            "backgroundColor": "rgba(47,69,84,0)",
            "dataBackgroundColor": "rgba(47,69,84,0.3)",
            "fillerColor": "rgba(167,183,204,0.4)",
            "handleColor": "#a7b7cc",
            "handleSize": "100%",
            "textStyle": {
                "color": "#333333"
            }
        },
        "markPoint": {
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#eeeeee"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#eeeeee"
                    }
                }
            }
        }
    });
}));

exports.colors = colorPalette;
