export default function () {
  return {
    $tooltip: {
      position: 'top'
    },
    $visualMap: {
      min: 0,
      max: 1000,
      calculable: true,
      orient: 'horizontal',
      left: 'left',
      top: 'top'
    },
    $calendar: {
      orient: 'horizontal',
      top: 50,
      cellSize: ['auto', 20],
      left: 80,
      right: 80,
      monthLabel: {
        nameMap: 'cn',
      },
      dayLabel: {
        nameMap: 'cn'
      }
    },
    $language: {
      nameMap: 'cn',
    },
    $showAll: true,
    $series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      silent: false,
    },
  };
}
