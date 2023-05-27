var jsPsychHtmlButtonResponse = (function (t) {
  "use strict";
  const e = {
    name: "html-button-response",
    parameters: {
      stimulus: {
        type: t.ParameterType.HTML_STRING,
        pretty_name: "Stimulus",
        default: void 0,
      },
      choices: {
        type: t.ParameterType.STRING,
        pretty_name: "Choices",
        default: void 0,
        array: !0,
      },
      button_html: {
        type: t.ParameterType.HTML_STRING,
        pretty_name: "Button HTML",
        default: '<button class="jspsych-btn">%choice%</button>',
        array: !0,
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
      margin_vertical: {
        type: t.ParameterType.STRING,
        pretty_name: "Margin vertical",
        default: "0px",
      },
      margin_horizontal: {
        type: t.ParameterType.STRING,
        pretty_name: "Margin horizontal",
        default: "8px",
      },
      response_ends_trial: {
        type: t.ParameterType.BOOL,
        pretty_name: "Response ends trial",
        default: !0,
      },
    },
  };
  class r {
    constructor(t) {
      this.jsPsych = t;
    }
    trial(t, e) {
      var r =
          '<div id="jspsych-html-button-response-stimulus">' +
          e.stimulus +
          "</div>",
        n = [];
      if (Array.isArray(e.button_html))
        e.button_html.length == e.choices.length
          ? (n = e.button_html)
          : console.error(
              "Error in html-button-response plugin. The length of the button_html array does not equal the length of the choices array"
            );
      else for (var s = 0; s < e.choices.length; s++) n.push(e.button_html);
      r += '<div id="jspsych-html-button-response-btngroup">';
      for (s = 0; s < e.choices.length; s++) {
        var o = n[s].replace(/%choice%/g, e.choices[s]);
        r +=
          '<div class="jspsych-html-button-response-button" style="display: inline-block; margin:' +
          e.margin_vertical +
          " " +
          e.margin_horizontal +
          '" id="jspsych-html-button-response-button-' +
          s +
          '" data-choice="' +
          s +
          '">' +
          o +
          "</div>";
      }
      (r += "</div>"), null !== e.prompt && (r += e.prompt), (t.innerHTML = r);
      var a = performance.now();
      for (s = 0; s < e.choices.length; s++)
        t.querySelector(
          "#jspsych-html-button-response-button-" + s
        ).addEventListener("click", function (t) {
          u(t.currentTarget.getAttribute("data-choice"));
        });
      var l = { rt: null, button: null };
      const i = () => {
        this.jsPsych.pluginAPI.clearAllTimeouts();
        var r = { rt: l.rt, stimulus: e.stimulus, response: l.button };
        (t.innerHTML = ""), this.jsPsych.finishTrial(r);
      };
      function u(r) {
        var n = performance.now(),
          s = Math.round(n - a);
        (l.button = parseInt(r)),
          (l.rt = s),
          (t.querySelector(
            "#jspsych-html-button-response-stimulus"
          ).className += " responded");
        for (
          var o = document.querySelectorAll(
              ".jspsych-html-button-response-button button"
            ),
            u = 0;
          u < o.length;
          u++
        )
          o[u].setAttribute("disabled", "disabled");
        e.response_ends_trial && i();
      }
      null !== e.stimulus_duration &&
        this.jsPsych.pluginAPI.setTimeout(function () {
          t.querySelector(
            "#jspsych-html-button-response-stimulus"
          ).style.visibility = "hidden";
        }, e.stimulus_duration),
        null !== e.trial_duration &&
          this.jsPsych.pluginAPI.setTimeout(function () {
            i();
          }, e.trial_duration);
    }
  }
  return (r.info = e), r;
})(jsPsychModule);
//# sourceMappingURL=index.browser.min.js.map
