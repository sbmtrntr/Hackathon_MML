var jsPsychExtensionWebgazer = (function () {
  "use strict";
  class e {
    constructor(e) {
      (this.jsPsych = e),
        (this.currentTrialData = []),
        (this.currentTrialTargets = {}),
        (this.initialized = !1),
        (this.activeTrial = !1),
        (this.initialize = ({
          round_predictions: e = !0,
          auto_initialize: t = !1,
          sampling_interval: i = 34,
          webgazer: s,
        }) => (
          (this.round_predictions = e),
          (this.sampling_interval = i),
          (this.gazeUpdateCallbacks = []),
          (this.domObserver = new MutationObserver(
            this.mutationObserverCallback
          )),
          new Promise((e, i) => {
            void 0 === s
              ? window.webgazer
                ? (this.webgazer = window.webgazer)
                : i(
                    new Error(
                      "Webgazer extension failed to initialize. webgazer.js not loaded. Load webgazer.js before calling initJsPsych()"
                    )
                  )
              : (this.webgazer = s),
              this.hideVideo(),
              this.hidePredictions(),
              t
                ? this.webgazer
                    .begin()
                    .then(() => {
                      (this.initialized = !0),
                        this.stopMouseCalibration(),
                        this.pause(),
                        e();
                    })
                    .catch((e) => {
                      console.error(e), i(e);
                    })
                : e();
          })
        )),
        (this.on_start = (e) => {
          (this.currentTrialData = []),
            (this.currentTrialTargets = {}),
            (this.currentTrialSelectors = e.targets),
            this.domObserver.observe(this.jsPsych.getDisplayElement(), {
              childList: !0,
            });
        }),
        (this.on_load = () => {
          (this.currentTrialStart = performance.now()),
            this.startSampleInterval(),
            (this.activeTrial = !0);
        }),
        (this.on_finish = () => (
          this.stopSampleInterval(),
          this.domObserver.disconnect(),
          (this.activeTrial = !1),
          {
            webgazer_data: this.currentTrialData,
            webgazer_targets: this.currentTrialTargets,
          }
        )),
        (this.start = () =>
          new Promise((e, t) => {
            if (void 0 === this.webgazer) {
              const e =
                "Failed to start webgazer. Things to check: Is webgazer.js loaded? Is the webgazer extension included in initJsPsych?";
              console.error(e), t(e);
            }
            this.webgazer
              .begin()
              .then(() => {
                (this.initialized = !0),
                  this.stopMouseCalibration(),
                  this.pause(),
                  e();
              })
              .catch((e) => {
                console.error(e), t(e);
              });
          })),
        (this.startSampleInterval = (e = this.sampling_interval) => {
          (this.gazeInterval = setInterval(() => {
            this.webgazer
              .getCurrentPrediction()
              .then(this.handleGazeDataUpdate);
          }, e)),
            this.webgazer
              .getCurrentPrediction()
              .then(this.handleGazeDataUpdate);
        }),
        (this.stopSampleInterval = () => {
          clearInterval(this.gazeInterval);
        }),
        (this.isInitialized = () => this.initialized),
        (this.faceDetected = () => this.webgazer.getTracker().predictionReady),
        (this.showPredictions = () => {
          this.webgazer.showPredictionPoints(!0);
        }),
        (this.hidePredictions = () => {
          this.webgazer.showPredictionPoints(!1);
        }),
        (this.showVideo = () => {
          this.webgazer.showVideo(!0),
            this.webgazer.showFaceOverlay(!0),
            this.webgazer.showFaceFeedbackBox(!0);
        }),
        (this.hideVideo = () => {
          this.webgazer.showVideo(!1),
            this.webgazer.showFaceOverlay(!1),
            this.webgazer.showFaceFeedbackBox(!1);
        }),
        (this.resume = () => {
          this.webgazer.resume();
        }),
        (this.pause = () => {
          this.webgazer.pause(),
            document.querySelector("#webgazerGazeDot") &&
              (document.querySelector("#webgazerGazeDot").style.display =
                "none");
        }),
        (this.resetCalibration = () => {
          this.webgazer.clearData();
        }),
        (this.stopMouseCalibration = () => {
          this.webgazer.removeMouseEventListeners();
        }),
        (this.startMouseCalibration = () => {
          this.webgazer.addMouseEventListeners();
        }),
        (this.calibratePoint = (e, t) => {
          this.webgazer.recordScreenPosition(e, t, "click");
        }),
        (this.setRegressionType = (e) => {
          ["ridge", "weightedRidge", "threadedRidge"].includes(e)
            ? this.webgazer.setRegression(e)
            : console.warn(
                "Invalid regression_type parameter for webgazer.setRegressionType. Valid options are ridge, weightedRidge, and threadedRidge."
              );
        }),
        (this.getCurrentPrediction = () =>
          this.webgazer.getCurrentPrediction()),
        (this.onGazeUpdate = (e) => (
          this.gazeUpdateCallbacks.push(e),
          () => {
            this.gazeUpdateCallbacks = this.gazeUpdateCallbacks.filter(
              (t) => t !== e
            );
          }
        )),
        (this.handleGazeDataUpdate = (e, t) => {
          if (null !== e) {
            var i = {
              x: this.round_predictions ? Math.round(e.x) : e.x,
              y: this.round_predictions ? Math.round(e.y) : e.y,
              t: e.t,
            };
            this.activeTrial &&
              ((i.t = Math.round(e.t - this.currentTrialStart)),
              this.currentTrialData.push(i)),
              (this.currentGaze = i);
            for (var s = 0; s < this.gazeUpdateCallbacks.length; s++)
              this.gazeUpdateCallbacks[s](i);
          } else this.currentGaze = null;
        }),
        (this.mutationObserverCallback = (e, t) => {
          for (const e of this.currentTrialSelectors)
            if (
              !this.currentTrialTargets[e] &&
              this.jsPsych.getDisplayElement().querySelector(e)
            ) {
              var i = this.jsPsych
                .getDisplayElement()
                .querySelector(e)
                .getBoundingClientRect();
              this.currentTrialTargets[e] = i;
            }
        });
    }
  }
  return (e.info = { name: "webgazer" }), e;
})();
//# sourceMappingURL=index.browser.min.js.map
