var jsPsychWebgazerValidate = (function (t) {
  "use strict";
  const e = {
    name: "webgazer-validate",
    parameters: {
      validation_points: {
        type: t.ParameterType.INT,
        default: [
          [10, 10],
          [10, 50],
          [10, 90],
          [50, 10],
          [50, 50],
          [50, 90],
          [90, 10],
          [90, 50],
          [90, 90],
        ],
        array: !0,
      },
      validation_point_coordinates: {
        type: t.ParameterType.SELECT,
        default: "percent",
        options: ["percent", "center-offset-pixels"],
      },
      roi_radius: { type: t.ParameterType.INT, default: 200 },
      randomize_validation_order: { type: t.ParameterType.BOOL, default: !1 },
      time_to_saccade: { type: t.ParameterType.INT, default: 1e3 },
      validation_duration: { type: t.ParameterType.INT, default: 2e3 },
      point_size: { type: t.ParameterType.INT, default: 20 },
      show_validation_data: { type: t.ParameterType.BOOL, default: !1 },
    },
  };
  class i {
    constructor(t) {
      this.jsPsych = t;
    }
    trial(t, e) {
      var i = {
        raw_gaze: [],
        percent_in_roi: [],
        average_offset: [],
        validation_points: null,
      };
      t.innerHTML =
        "\n        <div id='webgazer-validate-container' style='position: relative; width:100vw; height:100vh; overflow: hidden;'>\n        </div>";
      var a = t.querySelector("#webgazer-validate-container"),
        n = -1,
        o = null,
        r = performance.now();
      const s = () => {
          this.jsPsych.extensions.webgazer.stopSampleInterval(),
            this.jsPsych.pluginAPI.clearAllTimeouts(),
            (t.innerHTML = ""),
            this.jsPsych.finishTrial(i);
        },
        d = (t) => {
          var n = u(t[0], t[1]);
          a.innerHTML = n;
          var o = a.querySelector(".validation-point").getBoundingClientRect(),
            s = o.left + o.width / 2,
            d = o.top + o.height / 2,
            l = performance.now() + e.time_to_saccade,
            c = l + e.validation_duration,
            h = [],
            v = this.jsPsych.extensions.webgazer.onGazeUpdate((t) => {
              performance.now() > l &&
                h.push({
                  x: t.x,
                  y: t.y,
                  dx: t.x - s,
                  dy: t.y - d,
                  t: Math.round(t.t - r),
                });
            });
          requestAnimationFrame(function t() {
            performance.now() < c
              ? requestAnimationFrame(t)
              : (i.raw_gaze.push(h), v(), p());
          });
        },
        p = () => {
          if (++n == o.length) c();
          else {
            var t = o[n];
            d(t);
          }
        },
        l = () => {
          for (var t = "", n = 0; n < e.validation_points.length; n++) {
            (t += u(e.validation_points[n][0], e.validation_points[n][1])),
              (t += h(
                e.validation_points[n][0],
                e.validation_points[n][1],
                0,
                0,
                e.roi_radius
              ));
            for (var o = 0; o < i.raw_gaze[n].length; o++)
              t += v(
                e.validation_points[n][0],
                e.validation_points[n][1],
                i.raw_gaze[n][o].dx,
                i.raw_gaze[n][o].dy
              );
          }
          (t +=
            '<button id="cont" style="position:absolute; top: 50%; left:calc(50% - 50px); width: 100px;" class="jspsych-btn">Continue</btn>'),
            (a.innerHTML = t),
            a.querySelector("#cont").addEventListener("click", () => {
              this.jsPsych.extensions.webgazer.pause(), s();
            }),
            this.jsPsych.extensions.webgazer.showPredictions(),
            this.jsPsych.extensions.webgazer.stopSampleInterval(),
            this.jsPsych.extensions.webgazer.resume();
        },
        c = () => {
          i.samples_per_sec = (function (t) {
            var e = [];
            if (0 == t.length) return 0;
            for (var i = 0; i < t.length; i++)
              if (t[i].length > 1) {
                for (var a = [], n = 1; n < t[i].length; n++)
                  a.push(t[i][n].t - t[i][n - 1].t);
                e.push(
                  a.reduce(function (t, e) {
                    return t + e;
                  }, 0) / a.length
                );
              }
            return e.length > 0
              ? 1e3 /
                  (e.reduce(function (t, e) {
                    return t + e;
                  }, 0) /
                    e.length)
              : null;
          })(i.raw_gaze).toFixed(2);
          for (var t = 0; t < e.validation_points.length; t++)
            (i.percent_in_roi[t] =
              ((a = i.raw_gaze[t]),
              (n = void 0),
              (o = void 0),
              void 0,
              (n = a.map(function (t) {
                return Math.sqrt(Math.pow(t.dx, 2) + Math.pow(t.dy, 2));
              })),
              (o = n.reduce(function (t, i) {
                return i <= e.roi_radius && t++, t;
              }, 0)),
              (o / a.length) * 100)),
              (i.average_offset[t] = _(i.raw_gaze[t]));
          var a, n, o;
          e.show_validation_data ? l() : s();
        };
      function u(t, i) {
        return "percent" == e.validation_point_coordinates
          ? (function (t, i) {
              return `<div class="validation-point" style="width:${e.point_size}px; height:${e.point_size}px; border-radius:${e.point_size}px; border: 1px solid #000; background-color: #333; position: absolute; left:${t}%; top:${i}%;"></div>`;
            })(t, i)
          : "center-offset-pixels" == e.validation_point_coordinates
          ? (function (t, i) {
              return `<div class="validation-point" style="width:${
                e.point_size
              }px; height:${e.point_size}px; border-radius:${
                e.point_size
              }px; border: 1px solid #000; background-color: #333; position: absolute; left:calc(50% - ${
                e.point_size / 2
              }px + ${t}px); top:calc(50% - ${
                e.point_size / 2
              }px + ${i}px);"></div>`;
            })(t, i)
          : void 0;
      }
      function h(t, i, a, n, o) {
        return "percent" == e.validation_point_coordinates
          ? (function (t, e, i, a, n) {
              return `\n          <div class="validation-centroid" style="width:${
                2 * n
              }px; height:${
                2 * n
              }px; border: 2px dotted #ccc; border-radius: ${n}px; background-color: transparent; position: absolute; left:calc(${t}% + ${
                i - n
              }px); top:calc(${e}% + ${a - n}px);"></div>\n        `;
            })(t, i, a, n, o)
          : "center-offset-pixels" == e.validation_point_coordinates
          ? (function (t, e, i, a, n) {
              return `\n          <div class="validation-centroid" style="width:${
                2 * n
              }px; height:${
                2 * n
              }px; border: 2px dotted #ccc; border-radius: ${n}px; background-color: transparent; position: absolute; left:calc(50% + ${t}px + ${
                i - n
              }px); top:calc(50% + ${e}px + ${a - n}px);"></div>\n        `;
            })(t, i, a, n, o)
          : void 0;
      }
      function v(t, i, a, n) {
        return "percent" == e.validation_point_coordinates
          ? (function (t, i, a, n) {
              return `<div class="raw-data-point" style="width:5px; height:5px; border-radius:5px; background-color: ${
                Math.sqrt(a * a + n * n) <= e.roi_radius ? "#afa" : "#faa"
              }; opacity:0.8; position: absolute; left:calc(${t}% + ${
                a - 2
              }px); top:calc(${i}% + ${n - 2}px);"></div>`;
            })(t, i, a, n)
          : "center-offset-pixels" == e.validation_point_coordinates
          ? (function (t, i, a, n) {
              return `<div class="raw-data-point" style="width:5px; height:5px; border-radius:5px; background-color: ${
                Math.sqrt(a * a + n * n) <= e.roi_radius ? "#afa" : "#faa"
              }; opacity:0.8; position: absolute; left:calc(50% + ${t}px + ${
                a - 2
              }px); top:calc(50% + ${i}px + ${n - 2}px);"></div>`;
            })(t, i, a, n)
          : void 0;
      }
      function _(t) {
        var e,
          i,
          a,
          n = t.reduce(function (e, i, a) {
            return (e += i.dx), a == t.length - 1 ? e / t.length : e;
          }, 0),
          o = t.reduce(function (e, i, a) {
            return (e += i.dy), a == t.length - 1 ? e / t.length : e;
          }, 0),
          r =
            ((e = t.map(function (t) {
              return Math.sqrt(Math.pow(t.dx - n, 2) + Math.pow(t.dy - o, 2));
            })),
            (i = Math.floor(e.length / 2)),
            (a = e.sort((t, e) => t - e)),
            e.length % 2 == 0 ? a[i - 1] + a[i] / 2 : a[i]);
        return { x: n, y: o, r: r };
      }
      (() => {
        (o = e.randomize_validation_order
          ? this.jsPsych.randomization.shuffle(e.validation_points)
          : e.validation_points),
          (i.validation_points = o),
          (n = -1),
          this.jsPsych.extensions.webgazer.startSampleInterval(),
          p();
      })();
    }
  }
  return (i.info = e), i;
})(jsPsychModule);
//# sourceMappingURL=index.browser.min.js.map
