/* eslint-disable */

var colorPalette = [
            "#7151b0",
            "#db5eb0",
            "#58c6e8",
            "#5341a3",
            "#bf3794",
            "#3799c4"
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
    echarts.registerTheme('vintage', {
        "color": colorPalette,
        "backgroundColor": "rgba(255,247,239,1)",
        "textStyle": {},
        "title": {
            "textStyle": {
                "color": "#873f22"
            },
            "subtextStyle": {
                "color": "#c79c69"
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
                    "width": "2"
                }
            },
            "symbolSize": "7",
            "symbol": "circle",
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
                    "width": "2"
                }
            },
            "symbolSize": "7",
            "symbol": "circle",
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
                    "color": "#e098c7",
                    "color0": "transparent",
                    "borderColor": "#e354b1",
                    "borderColor0": "#2db7e3",
                    "borderWidth": "2"
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
                    "color": "#c97334"
                }
            },
            "symbolSize": "7",
            "symbol": "circle",
            "smooth": true,
            "color": [
                "#7151b0",
                "#db5eb0",
                "#58c6e8",
                "#5341a3",
                "#bf3794",
                "#3799c4"
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
                    "areaColor": "rgba(224,152,199,1)",
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
                        "color": "rgb(255,255,255)"
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
                    "areaColor": "rgba(224,152,199,1)",
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
                        "color": "rgb(255,255,255)"
                    }
                }
            }
        },
        "categoryAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#944316"
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
                    "color": "#5e2513"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "rgba(115,52,16,0.2)"
                    ]
                }
            },
            "splitArea": {
                "show": true,
                "areaStyle": {
                    "color": [
                        "rgba(184,82,11,0)"
                    ]
                }
            }
        },
        "valueAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#944316"
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
                    "color": "#5e2513"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "rgba(115,52,16,0.2)"
                    ]
                }
            },
            "splitArea": {
                "show": true,
                "areaStyle": {
                    "color": [
                        "rgba(184,82,11,0)"
                    ]
                }
            }
        },
        "logAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#944316"
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
                    "color": "#5e2513"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "rgba(115,52,16,0.2)"
                    ]
                }
            },
            "splitArea": {
                "show": true,
                "areaStyle": {
                    "color": [
                        "rgba(184,82,11,0)"
                    ]
                }
            }
        },
        "timeAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#944316"
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
                    "color": "#5e2513"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "rgba(115,52,16,0.2)"
                    ]
                }
            },
            "splitArea": {
                "show": true,
                "areaStyle": {
                    "color": [
                        "rgba(184,82,11,0)"
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
                "color": "#4a2206"
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
                "color": "#8fd3e8",
                "width": 1
            },
            "itemStyle": {
                "normal": {
                    "color": "#8fd3e8",
                    "borderWidth": 1
                },
                "emphasis": {
                    "color": "#8fd3e8"
                }
            },
            "controlStyle": {
                "normal": {
                    "color": "#8fd3e8",
                    "borderColor": "#8fd3e8",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "color": "#8fd3e8",
                    "borderColor": "#8fd3e8",
                    "borderWidth": 0.5
                }
            },
            "checkpointStyle": {
                "color": "#8fd3e8",
                "borderColor": "rgba(138,124,168,0.37)"
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#8fd3e8"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#8fd3e8"
                    }
                }
            }
        },
        "visualMap": {
            "color": [
                "#8368bd",
                "#e36fbb",
                "#6ed1eb"
            ]
        },
        "dataZoom": {
            "backgroundColor": "rgba(0,0,0,0)",
            "dataBackgroundColor": "rgba(255,255,255,0.3)",
            "fillerColor": "rgba(204,183,167,0.4)",
            "handleColor": "#b85814",
            "handleSize": "100%",
            "textStyle": {
                "color": "#5e2707"
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
