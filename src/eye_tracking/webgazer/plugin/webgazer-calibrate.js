var jsPsychWebgazerCalibrate = (function (e) {
  "use strict";
  const i = {
    name: "webgazer-calibrate",
    parameters: {
      calibration_points: {
        type: e.ParameterType.INT,
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
      calibration_mode: {
        type: e.ParameterType.SELECT,
        options: ["click", "view"],
        default: "click",
      },
      point_size: { type: e.ParameterType.INT, default: 20 },
      repetitions_per_point: { type: e.ParameterType.INT, default: 1 },
      randomize_calibration_order: { type: e.ParameterType.BOOL, default: !1 },
      time_to_saccade: { type: e.ParameterType.INT, default: 1e3 },
      time_per_point: { type: e.ParameterType.INT, default: 1e3 },
    },
  };
  class t {
    constructor(e) {
      this.jsPsych = e;
    }
    trial(e, i) {
      e.innerHTML =
        "\n          <div id='webgazer-calibrate-container' style='position: relative; width:100vw; height:100vh'>\n          </div>";
      var t = e.querySelector("#webgazer-calibrate-container"),
        a = 0,
        r = -1,
        n = null;
      const o = () => {
          (n = i.randomize_calibration_order
            ? this.jsPsych.randomization.shuffle(i.calibration_points)
            : i.calibration_points),
            (r = -1),
            s();
        },
        s = () => {
          if (++r == n.length) ++a == i.repetitions_per_point ? l() : o();
          else {
            var e = n[r];
            c(e);
          }
        },
        c = (e) => {
          var a = `<div id="calibration-point" style="width:${i.point_size}px; height:${i.point_size}px; border-radius:${i.point_size}px; border: 1px solid #000; background-color: #333; position: absolute; left:${e[0]}%; top:${e[1]}%;"></div>`;
          t.innerHTML = a;
          var r = t.querySelector("#calibration-point");
          if (
            ("click" == i.calibration_mode &&
              ((r.style.cursor = "pointer"),
              r.addEventListener("click", function () {
                s();
              })),
            "view" == i.calibration_mode)
          ) {
            var n = r.getBoundingClientRect(),
              o = n.left + n.width / 2,
              c = n.top + n.height / 2,
              l = performance.now() + i.time_to_saccade,
              p = performance.now() + i.time_to_saccade + i.time_per_point;
            const e = () => {
              performance.now() > l &&
                this.jsPsych.extensions.webgazer.calibratePoint(o, c, "click"),
                performance.now() < p ? requestAnimationFrame(e) : s();
            };
            requestAnimationFrame(e);
          }
        },
        l = () => {
          "click" == i.calibration_mode &&
            this.jsPsych.extensions.webgazer.stopMouseCalibration(),
            (t.innerHTML = ""),
            p();
        },
        p = () => {
          this.jsPsych.extensions.webgazer.pause(),
            this.jsPsych.extensions.webgazer.hidePredictions(),
            this.jsPsych.extensions.webgazer.hideVideo(),
            this.jsPsych.pluginAPI.clearAllTimeouts();
          (e.innerHTML = ""), this.jsPsych.finishTrial({});
        };
      (() => {
        this.jsPsych.extensions.webgazer.resume(),
          "click" == i.calibration_mode &&
            this.jsPsych.extensions.webgazer.startMouseCalibration(),
          o();
      })();
    }
  }
  return (t.info = i), t;
})(jsPsychModule);
//# sourceMappingURL=index.browser.min.js.map
