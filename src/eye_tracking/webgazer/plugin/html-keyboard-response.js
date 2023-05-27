var jsPsychHtmlKeyboardResponse = (function (e) {
  "use strict";
  const s = {
    name: "html-keyboard-response",
    parameters: {
      stimulus: {
        type: e.ParameterType.HTML_STRING,
        pretty_name: "Stimulus",
        default: void 0,
      },
      choices: {
        type: e.ParameterType.KEYS,
        pretty_name: "Choices",
        default: "ALL_KEYS",
      },
      prompt: {
        type: e.ParameterType.HTML_STRING,
        pretty_name: "Prompt",
        default: null,
      },
      stimulus_duration: {
        type: e.ParameterType.INT,
        pretty_name: "Stimulus duration",
        default: null,
      },
      trial_duration: {
        type: e.ParameterType.INT,
        pretty_name: "Trial duration",
        default: null,
      },
      response_ends_trial: {
        type: e.ParameterType.BOOL,
        pretty_name: "Response ends trial",
        default: !0,
      },
    },
  };
  class t {
    constructor(e) {
      this.jsPsych = e;
    }
    trial(e, s) {
      var t =
        '<div id="jspsych-html-keyboard-response-stimulus">' +
        s.stimulus +
        "</div>";
      null !== s.prompt && (t += s.prompt), (e.innerHTML = t);
      var r = { rt: null, key: null };
      const i = () => {
        this.jsPsych.pluginAPI.clearAllTimeouts(),
          void 0 !== l && this.jsPsych.pluginAPI.cancelKeyboardResponse(l);
        var t = { rt: r.rt, stimulus: s.stimulus, response: r.key };
        (e.innerHTML = ""), this.jsPsych.finishTrial(t);
      };
      if ("NO_KEYS" != s.choices)
        var l = this.jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: function (t) {
            (e.querySelector(
              "#jspsych-html-keyboard-response-stimulus"
            ).className += " responded"),
              null == r.key && (r = t),
              s.response_ends_trial && i();
          },
          valid_responses: s.choices,
          rt_method: "performance",
          persist: !1,
          allow_held_key: !1,
        });
      null !== s.stimulus_duration &&
        this.jsPsych.pluginAPI.setTimeout(function () {
          e.querySelector(
            "#jspsych-html-keyboard-response-stimulus"
          ).style.visibility = "hidden";
        }, s.stimulus_duration),
        null !== s.trial_duration &&
          this.jsPsych.pluginAPI.setTimeout(function () {
            i();
          }, s.trial_duration);
    }
  }
  return (t.info = s), t;
})(jsPsychModule);
//# sourceMappingURL=index.browser.min.js.map
