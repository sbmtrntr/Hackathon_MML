var jsPsychImageKeyboardResponse = (function (t) {
  "use strict";
  const e = {
    name: "image-keyboard-response",
    parameters: {
      stimulus: {
        type: t.ParameterType.IMAGE,
        pretty_name: "Stimulus",
        default: void 0,
      },
      stimulus_height: {
        type: t.ParameterType.INT,
        pretty_name: "Image height",
        default: null,
      },
      stimulus_width: {
        type: t.ParameterType.INT,
        pretty_name: "Image width",
        default: null,
      },
      maintain_aspect_ratio: {
        type: t.ParameterType.BOOL,
        pretty_name: "Maintain aspect ratio",
        default: !0,
      },
      choices: {
        type: t.ParameterType.KEYS,
        pretty_name: "Choices",
        default: "ALL_KEYS",
      },
      prompt: {
        type: t.ParameterType.HTML_STRING,
        pretty_name: "Prompt",
        default: null,
      },
      stimulus_duration: {
        type: t.ParameterType.INT,
        pretty_name: "Stimulus duration",
        default: null,
      },
      trial_duration: {
        type: t.ParameterType.INT,
        pretty_name: "Trial duration",
        default: null,
      },
      response_ends_trial: {
        type: t.ParameterType.BOOL,
        pretty_name: "Response ends trial",
        default: !0,
      },
      render_on_canvas: {
        type: t.ParameterType.BOOL,
        pretty_name: "Render on canvas",
        default: !0,
      },
    },
  };
  class s {
    constructor(t) {
      this.jsPsych = t;
    }
    trial(t, e) {
      var s, i;
      if (e.render_on_canvas) {
        var a = !1;
        if (t.hasChildNodes())
          for (; t.firstChild; ) t.removeChild(t.firstChild);
        var r = document.createElement("canvas");
        (r.id = "jspsych-image-keyboard-response-stimulus"),
          (r.style.margin = "0"),
          (r.style.padding = "0");
        var n = r.getContext("2d");
        ((u = new Image()).onload = function () {
          a || (l(), n.drawImage(u, 0, 0, i, s));
        }),
          (u.src = e.stimulus);
        const l = () => {
          null !== e.stimulus_height
            ? ((s = e.stimulus_height),
              null == e.stimulus_width &&
                e.maintain_aspect_ratio &&
                (i = u.naturalWidth * (e.stimulus_height / u.naturalHeight)))
            : (s = u.naturalHeight),
            null !== e.stimulus_width
              ? ((i = e.stimulus_width),
                null == e.stimulus_height &&
                  e.maintain_aspect_ratio &&
                  (s = u.naturalHeight * (e.stimulus_width / u.naturalWidth)))
              : (null !== e.stimulus_height && e.maintain_aspect_ratio) ||
                (i = u.naturalWidth),
            (r.height = s),
            (r.width = i);
        };
        l(),
          t.insertBefore(r, null),
          u.complete &&
            Number.isFinite(i) &&
            Number.isFinite(s) &&
            (n.drawImage(u, 0, 0, i, s), (a = !0)),
          null !== e.prompt && t.insertAdjacentHTML("beforeend", e.prompt);
      } else {
        var l =
          '<img src="' +
          e.stimulus +
          '" id="jspsych-image-keyboard-response-stimulus">';
        null !== e.prompt && (l += e.prompt), (t.innerHTML = l);
        var u = t.querySelector("#jspsych-image-keyboard-response-stimulus");
        null !== e.stimulus_height
          ? ((s = e.stimulus_height),
            null == e.stimulus_width &&
              e.maintain_aspect_ratio &&
              (i = u.naturalWidth * (e.stimulus_height / u.naturalHeight)))
          : (s = u.naturalHeight),
          null !== e.stimulus_width
            ? ((i = e.stimulus_width),
              null == e.stimulus_height &&
                e.maintain_aspect_ratio &&
                (s = u.naturalHeight * (e.stimulus_width / u.naturalWidth)))
            : (null !== e.stimulus_height && e.maintain_aspect_ratio) ||
              (i = u.naturalWidth),
          (u.style.height = s.toString() + "px"),
          (u.style.width = i.toString() + "px");
      }
      var m = { rt: null, key: null };
      const o = () => {
        this.jsPsych.pluginAPI.clearAllTimeouts(),
          void 0 !== h && this.jsPsych.pluginAPI.cancelKeyboardResponse(h);
        var s = { rt: m.rt, stimulus: e.stimulus, response: m.key };
        (t.innerHTML = ""), this.jsPsych.finishTrial(s);
      };
      if ("NO_KEYS" != e.choices)
        var h = this.jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: function (s) {
            (t.querySelector(
              "#jspsych-image-keyboard-response-stimulus"
            ).className += " responded"),
              null == m.key && (m = s),
              e.response_ends_trial && o();
          },
          valid_responses: e.choices,
          rt_method: "performance",
          persist: !1,
          allow_held_key: !1,
        });
      null !== e.stimulus_duration &&
        this.jsPsych.pluginAPI.setTimeout(function () {
          t.querySelector(
            "#jspsych-image-keyboard-response-stimulus"
          ).style.visibility = "hidden";
        }, e.stimulus_duration),
        null !== e.trial_duration
          ? this.jsPsych.pluginAPI.setTimeout(function () {
              o();
            }, e.trial_duration)
          : !1 === e.response_ends_trial &&
            console.warn(
              "The experiment may be deadlocked. Try setting a trial duration or set response_ends_trial to true."
            );
    }
  }
  return (s.info = e), s;
})(jsPsychModule);
//# sourceMappingURL=index.browser.min.js.map
