// ##############################
// // // javascript library for creating charts
// #############################
var Chartist = require("chartist");

// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

// ##############################
// // // Daily Distance
// #############################

const dailyDistanceChart = {
  data: {
    labels: [],
    series: [[]]
  },
  options: {
    axisX: {
        showGrid: false,
        labelInterpolationFnc: function(value) {
          return value[0].replace('2020-','');
        }
    },
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0.2
    }),
    low: 0.0,
    high: 15.0, // set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0
    },
    scaleMinSpace: 100,
  },
  // for animation
  animation: {
    draw: function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

// ##############################
// // // Daily Steps
// #############################

const dailyStepsChart = {
  data: {
    labels: [
      
    ],
    series: []
  },
  options: {
    axisX: {
      showGrid: false,
      labelInterpolationFnc: function(value) {
        return value[0].replace('2020-','');
      }
    },
    low: 3000,
    high: 20000,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0
    }
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 1000,
        axisX: {
          labelInterpolationFnc: function(value) {
            return value[0].replace('2020-','');
          }
        }
      }
    ]
  ],
  animation: {
    draw: function(data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};


module.exports = {
    dailyStepsChart,
  dailyDistanceChart
};