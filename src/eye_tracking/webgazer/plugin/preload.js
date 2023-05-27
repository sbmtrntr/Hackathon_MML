var jsPsychPreload = (function (e) {
  "use strict";
  const r = {
    name: "preload",
    parameters: {
      auto_preload: {
        type: e.ParameterType.BOOL,
        pretty_name: "Auto-preload",
        default: !1,
      },
      trials: {
        type: e.ParameterType.TIMELINE,
        pretty_name: "Trials",
        default: [],
      },
      images: {
        type: e.ParameterType.STRING,
        pretty_name: "Images",
        default: [],
        array: !0,
      },
      audio: {
        type: e.ParameterType.STRING,
        pretty_name: "Audio",
        default: [],
        array: !0,
      },
      video: {
        type: e.ParameterType.STRING,
        pretty_name: "Video",
        default: [],
        array: !0,
      },
      message: {
        type: e.ParameterType.HTML_STRING,
        pretty_name: "Message",
        default: null,
      },
      show_progress_bar: {
        type: e.ParameterType.BOOL,
        pretty_name: "Show progress bar",
        default: !0,
      },
      continue_after_error: {
        type: e.ParameterType.BOOL,
        pretty_name: "Continue after error",
        default: !1,
      },
      error_message: {
        type: e.ParameterType.HTML_STRING,
        pretty_name: "Error message",
        default: "The experiment failed to load.",
      },
      show_detailed_errors: {
        type: e.ParameterType.BOOL,
        pretty_name: "Show detailed errors",
        default: !1,
      },
      max_load_time: {
        type: e.ParameterType.INT,
        pretty_name: "Max load time",
        default: null,
      },
      on_error: {
        type: e.ParameterType.FUNCTION,
        pretty_name: "On error",
        default: null,
      },
      on_success: {
        type: e.ParameterType.FUNCTION,
        pretty_name: "On success",
        default: null,
      },
    },
  };
  class t {
    constructor(e) {
      this.jsPsych = e;
    }
    trial(e, r) {
      var t = null,
        a = !1,
        s = [],
        o = [],
        i = [],
        n = [],
        l = this.jsPsych.getSafeModeStatus(),
        u = [],
        d = [],
        c = [];
      if (r.auto_preload) {
        var p = this.jsPsych.getTimeline(),
          h = this.jsPsych.pluginAPI.getAutoPreloadList(p);
        (u = u.concat(h.images)),
          (d = d.concat(h.audio)),
          (c = c.concat(h.video));
      }
      if (r.trials.length > 0) {
        var y = this.jsPsych.pluginAPI.getAutoPreloadList(r.trials);
        (u = u.concat(y.images)),
          (d = d.concat(y.audio)),
          (c = c.concat(y.video));
      }
      (u = u.concat(r.images)),
        (d = d.concat(r.audio)),
        (c = c.concat(r.video)),
        (u = this.jsPsych.utils.unique(u.flat())),
        (d = this.jsPsych.utils.unique(d.flat())),
        (c = this.jsPsych.utils.unique(c.flat())),
        l && (c = []);
      var g = "";
      null !== r.message && (g += r.message),
        r.show_progress_bar &&
          (g +=
            "\n            <div id='jspsych-loading-progress-bar-container' style='height: 10px; width: 300px; background-color: #ddd; margin: auto;'>\n              <div id='jspsych-loading-progress-bar' style='height: 10px; width: 0%; background-color: #777;'></div>\n            </div>"),
        (e.innerHTML = g);
      const m = () => {
          if ((I++, r.show_progress_bar)) {
            var t = (I / j) * 100,
              a = e.querySelector("#jspsych-loading-progress-bar");
            null !== a && (a.style.width = t + "%");
          }
        },
        _ = () => {
          void 0 !== a &&
            !1 === a &&
            (this.jsPsych.pluginAPI.clearAllTimeouts(),
            this.jsPsych.pluginAPI.cancelPreloads(),
            (t = !0),
            T());
        },
        P = () => {
          this.jsPsych.pluginAPI.cancelPreloads(),
            void 0 === t ||
              (!1 !== t && null !== t) ||
              ((a = !0),
              b < j && (t = !1),
              L("timeout"),
              n.push(
                "<p><strong>Loading timed out.</strong><br>Consider compressing your stimuli files, loading your files in smaller batches,<br>and/or increasing the <i>max_load_time</i> parameter.</p>"
              ),
              r.continue_after_error ? T() : f());
        },
        f = () => {
          this.jsPsych.pluginAPI.clearAllTimeouts(),
            this.jsPsych.pluginAPI.cancelPreloads(),
            (e.innerHTML = r.error_message),
            r.show_detailed_errors &&
              ((e.innerHTML += "<p><strong>Error details:</strong></p>"),
              n.forEach(function (r) {
                e.innerHTML += r;
              }));
        },
        T = () => {
          this.jsPsych.pluginAPI.clearAllTimeouts();
          var r = {
            success: t,
            timeout: a,
            failed_images: s,
            failed_audio: o,
            failed_video: i,
          };
          (e.innerHTML = ""), this.jsPsych.finishTrial(r);
        };
      null !== r.max_load_time &&
        this.jsPsych.pluginAPI.setTimeout(P, r.max_load_time);
      var j = u.length + d.length + c.length,
        I = 0,
        b = 0;
      if (0 == j) _();
      else {
        const e = (e) => {
            this.jsPsych.pluginAPI.preloadVideo(c, e, A, v);
          },
          r = (e) => {
            this.jsPsych.pluginAPI.preloadAudio(d, e, A, v);
          },
          t = (e) => {
            this.jsPsych.pluginAPI.preloadImages(u, e, A, v);
          };
        c.length > 0 && e(function () {}),
          d.length > 0 && r(function () {}),
          u.length > 0 && t(function () {});
      }
      function v(e) {
        m(), null == t && (t = !1);
        var a = "unknown file";
        e.source && (a = e.source),
          e.error &&
            e.error.path &&
            e.error.path.length > 0 &&
            ("img" == e.error.path[0].localName
              ? s.push(a)
              : "audio" == e.error.path[0].localName
              ? o.push(a)
              : "video" == e.error.path[0].localName && i.push(a));
        var l = "<p><strong>Error loading file: " + a + "</strong><br>";
        e.error.statusText &&
          (l += "File request response status: " + e.error.statusText + "<br>"),
          "404" == e.error && (l += "404 - file not found.<br>"),
          void 0 !== e.error.loaded &&
          null !== e.error.loaded &&
          0 !== e.error.loaded
            ? (l += e.error.loaded + " bytes transferred.")
            : (l +=
                "File did not begin loading. Check that file path is correct and reachable by the browser,<br>and that loading is not blocked by cross-origin resource sharing (CORS) errors."),
          (l += "</p>"),
          n.push(l),
          L(a),
          I == j && (r.continue_after_error ? T() : f());
      }
      function A(e) {
        m(),
          (function (e) {
            null !== r.on_success && r.on_success(e);
          })(e),
          ++b == j ? _() : I == j && (r.continue_after_error ? T() : f());
      }
      function L(e) {
        null !== r.on_error && r.on_error(e);
      }
    }
  }
  return (t.info = r), t;
})(jsPsychModule);
//# sourceMappingURL=index.browser.min.js.map
