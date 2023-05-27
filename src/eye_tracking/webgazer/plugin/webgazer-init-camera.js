var jsPsychWebgazerInitCamera = (function (e) {
  "use strict";
  const t = {
    name: "webgazer-init-camera",
    parameters: {
      instructions: {
        type: e.ParameterType.HTML_STRING,
        default:
          "\n            <p>Position your head so that the webcam has a good view of your eyes.</p>\n            <p>Center your face in the box and look directly towards the camera.</p>\n            <p>It is important that you try and keep your head reasonably still throughout the experiment, so please take a moment to adjust your setup to be comfortable.</p>\n            <p>When your face is centered in the box and the box is green, you can click to continue.</p>",
      },
      button_text: { type: e.ParameterType.STRING, default: "Continue" },
    },
  };
  class n {
    constructor(e) {
      this.jsPsych = e;
    }
    trial(e, t, n) {
      let r;
      var o,
        s = performance.now();
      const a = () => {
          this.jsPsych.extensions.webgazer.pause(),
            this.jsPsych.extensions.webgazer.hideVideo(),
            this.jsPsych.pluginAPI.clearAllTimeouts();
          var t = { load_time: o };
          (e.innerHTML = ""),
            document.querySelector("#webgazer-center-style").remove(),
            this.jsPsych.finishTrial(t),
            r();
        },
        i = () => {
          n(), (o = Math.round(performance.now() - s));
          document
            .querySelector("head")
            .insertAdjacentHTML(
              "beforeend",
              '\n          <style id="webgazer-center-style">\n            #webgazerVideoContainer { top: 20px !important; left: calc(50% - 160px) !important;}\n          </style>\n        '
            );
          if (
            ((e.innerHTML =
              "\n          <div id='webgazer-init-container' style='position: relative; width:100vw; height:100vh'>\n          </div>"),
            this.jsPsych.extensions.webgazer.showVideo(),
            this.jsPsych.extensions.webgazer.resume(),
            (e.querySelector(
              "#webgazer-init-container"
            ).innerHTML = `\n          <div style='position: absolute; top: max(260px, 40%); left: calc(50% - 400px); width:800px;'>\n          ${t.instructions}\n          <button id='jspsych-wg-cont' class='jspsych-btn' disabled>${t.button_text}</button>\n          </div>`),
            document.querySelector("#webgazerFaceFeedbackBox") &&
              "green" ==
                document.querySelector("#webgazerFaceFeedbackBox").style
                  .borderColor)
          )
            document.querySelector("#jspsych-wg-cont").disabled = !1;
          else {
            var r = new MutationObserver(c);
            r.observe(document, {
              attributes: !0,
              attributeFilter: ["style"],
              subtree: !0,
            });
          }
          document
            .querySelector("#jspsych-wg-cont")
            .addEventListener("click", function () {
              r && r.disconnect(), a();
            });
        };
      function c(e, t) {
        e[0].target == document.querySelector("#webgazerFaceFeedbackBox") &&
          ("attributes" == e[0].type &&
            "green" == e[0].target.style.borderColor &&
            (document.querySelector("#jspsych-wg-cont").disabled = !1),
          "attributes" == e[0].type &&
            "red" == e[0].target.style.borderColor &&
            (document.querySelector("#jspsych-wg-cont").disabled = !0));
      }
      return (
        this.jsPsych.extensions.webgazer.isInitialized()
          ? i()
          : this.jsPsych.extensions.webgazer
              .start()
              .then(() => {
                i();
              })
              .catch((t) => {
                console.log(t),
                  (e.innerHTML =
                    "<p>The experiment cannot continue because the eye tracker failed to start.</p>\n              <p>This may be because of a technical problem or because you did not grant permission for the page to use your camera.</p>");
              }),
        new Promise((e) => {
          r = e;
        })
      );
    }
  }
  return (n.info = t), n;
})(jsPsychModule);
//# sourceMappingURL=index.browser.min.js.map
