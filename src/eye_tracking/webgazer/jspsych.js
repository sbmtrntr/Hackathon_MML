var jsPsychModule = (function (e) {
    "use strict";
    function t(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          var i =
            null == e
              ? null
              : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                e["@@iterator"];
          if (null == i) return;
          var r,
            s,
            n = [],
            o = !0,
            a = !1;
          try {
            for (
              i = i.call(e);
              !(o = (r = i.next()).done) &&
              (n.push(r.value), !t || n.length !== t);
              o = !0
            );
          } catch (e) {
            (a = !0), (s = e);
          } finally {
            try {
              o || null == i.return || i.return();
            } finally {
              if (a) throw s;
            }
          }
          return n;
        })(e, t) ||
        i(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function i(e, t) {
      if (e) {
        if ("string" == typeof e) return r(e, t);
        var i = Object.prototype.toString.call(e).slice(8, -1);
        return (
          "Object" === i && e.constructor && (i = e.constructor.name),
          "Map" === i || "Set" === i
            ? Array.from(e)
            : "Arguments" === i ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
            ? r(e, t)
            : void 0
        );
      }
    }
    function r(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var i = 0, r = new Array(t); i < t; i++) r[i] = e[i];
      return r;
    }
    function s(e, t) {
      var r =
        ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
      if (!r) {
        if (
          Array.isArray(e) ||
          (r = i(e)) ||
          (t && e && "number" == typeof e.length)
        ) {
          r && (e = r);
          var s = 0,
            n = function () {};
          return {
            s: n,
            n: function () {
              return s >= e.length ? { done: !0 } : { done: !1, value: e[s++] };
            },
            e: function (e) {
              throw e;
            },
            f: n,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      }
      var o,
        a = !0,
        l = !1;
      return {
        s: function () {
          r = r.call(e);
        },
        n: function () {
          var e = r.next();
          return (a = e.done), e;
        },
        e: function (e) {
          (l = !0), (o = e);
        },
        f: function () {
          try {
            a || null == r.return || r.return();
          } finally {
            if (l) throw o;
          }
        },
      };
    }
    function n(e, t, i, r) {
      return new (i || (i = Promise))(function (s, n) {
        function o(e) {
          try {
            l(r.next(e));
          } catch (e) {
            n(e);
          }
        }
        function a(e) {
          try {
            l(r.throw(e));
          } catch (e) {
            n(e);
          }
        }
        function l(e) {
          var t;
          e.done
            ? s(e.value)
            : ((t = e.value),
              t instanceof i
                ? t
                : new i(function (e) {
                    e(t);
                  })).then(o, a);
        }
        l((r = r.apply(e, t || [])).next());
      });
    }
    var o = function (e) {
        var t = new Set();
        do {
          var i,
            r = s(Reflect.ownKeys(e));
          try {
            for (r.s(); !(i = r.n()).done; ) {
              var n = i.value;
              t.add([e, n]);
            }
          } catch (e) {
            r.e(e);
          } finally {
            r.f();
          }
        } while ((e = Reflect.getPrototypeOf(e)) && e !== Object.prototype);
        return t;
      },
      a = function (e) {
        var i,
          r =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = r.include,
          a = r.exclude,
          l = function (e) {
            var t = function (t) {
              return "string" == typeof t ? e === t : t.test(e);
            };
            return n ? n.some(t) : !a || !a.some(t);
          },
          h = s(o(e.constructor.prototype));
        try {
          for (h.s(); !(i = h.n()).done; ) {
            var c = t(i.value, 2),
              u = c[0],
              d = c[1];
            if ("constructor" !== d && l(d)) {
              var p = Reflect.getOwnPropertyDescriptor(u, d);
              p && "function" == typeof p.value && (e[d] = e[d].bind(e));
            }
          }
        } catch (e) {
          h.e(e);
        } finally {
          h.f();
        }
        return e;
      };
    function l(e) {
      return [...new Set(e)];
    }
    function h(e) {
      if (!e) return e;
      let t;
      if (Array.isArray(e)) {
        t = [];
        for (const i of e) t.push(h(i));
        return t;
      }
      if ("object" == typeof e && null !== e) {
        t = {};
        for (const i in e) e.hasOwnProperty(i) && (t[i] = h(e[i]));
        return t;
      }
      return e;
    }
    var c,
      u = Object.freeze({ __proto__: null, unique: l, deepCopy: h });
    class d {
      constructor(e = []) {
        this.values = e;
      }
      sum() {
        let e = 0;
        for (const t of this.values) e += t;
        return e;
      }
      mean() {
        return this.sum() / this.count();
      }
      median() {
        if (0 === this.values.length) return;
        const e = this.values.slice(0).sort(function (e, t) {
            return e - t;
          }),
          t = Math.floor(e.length / 2);
        return e.length % 2 == 0 ? (e[t] + e[t - 1]) / 2 : e[t];
      }
      min() {
        return Math.min.apply(null, this.values);
      }
      max() {
        return Math.max.apply(null, this.values);
      }
      count() {
        return this.values.length;
      }
      variance() {
        const e = this.mean();
        let t = 0;
        for (const i of this.values) t += Math.pow(i - e, 2);
        return t / (this.values.length - 1);
      }
      sd() {
        const e = this.variance();
        return Math.sqrt(e);
      }
      frequencies() {
        const e = {};
        for (const t of this.values) void 0 === e[t] ? (e[t] = 1) : e[t]++;
        return e;
      }
      all(e) {
        for (const t of this.values) if (!e(t)) return !1;
        return !0;
      }
      subset(e) {
        const t = [];
        for (const i of this.values) e(i) && t.push(i);
        return new d(t);
      }
    }
    class p {
      constructor(e = []) {
        this.trials = e;
      }
      push(e) {
        return this.trials.push(e), this;
      }
      join(e) {
        return (this.trials = this.trials.concat(e.values())), this;
      }
      top() {
        return this.trials.length <= 1
          ? this
          : new p([this.trials[this.trials.length - 1]]);
      }
      first(e = 1) {
        if (e < 1)
          throw "You must query with a positive nonzero integer. Please use a\n               different value for n.";
        return 0 === this.trials.length
          ? new p()
          : (e > this.trials.length && (e = this.trials.length),
            new p(this.trials.slice(0, e)));
      }
      last(e = 1) {
        if (e < 1)
          throw "You must query with a positive nonzero integer. Please use a\n               different value for n.";
        return 0 === this.trials.length
          ? new p()
          : (e > this.trials.length && (e = this.trials.length),
            new p(
              this.trials.slice(this.trials.length - e, this.trials.length)
            ));
      }
      values() {
        return this.trials;
      }
      count() {
        return this.trials.length;
      }
      readOnly() {
        return new p(h(this.trials));
      }
      addToAll(e) {
        for (const t of this.trials) Object.assign(t, e);
        return this;
      }
      addToLast(e) {
        return (
          0 != this.trials.length &&
            Object.assign(this.trials[this.trials.length - 1], e),
          this
        );
      }
      filter(e) {
        let t;
        t = Array.isArray(e) ? h(e) : h([e]);
        const i = [];
        for (const e of this.trials) {
          let r = !1;
          for (const i of t) {
            let t = !0;
            for (const r of Object.keys(i))
              (void 0 !== e[r] && e[r] === i[r]) || (t = !1);
            if (t) {
              r = !0;
              break;
            }
          }
          r && i.push(e);
        }
        return new p(i);
      }
      filterCustom(e) {
        return new p(this.trials.filter(e));
      }
      select(e) {
        const t = [];
        for (const i of this.trials) void 0 !== i[e] && t.push(i[e]);
        return new d(t);
      }
      ignore(e) {
        Array.isArray(e) || (e = [e]);
        const t = h(this.trials);
        for (const i of t) for (const t of e) delete i[t];
        return new p(t);
      }
      uniqueNames() {
        const e = [];
        for (const t of this.trials)
          for (const i of Object.keys(t)) e.includes(i) || e.push(i);
        return e;
      }
      csv() {
        return (function (e) {
          const t = "object" != typeof e ? JSON.parse(e) : e;
          let i = "",
            r = "";
          const s = [];
          for (const e of t)
            for (const t in e) {
              let e = t + "";
              (e = '"' + e.replace(/"/g, '""') + '",'),
                s.includes(t) || (s.push(t), (i += e));
            }
          (i = i.slice(0, -1)), (r += i + "\r\n");
          for (const e of t) {
            i = "";
            for (const t of s) {
              let r = void 0 === e[t] ? "" : e[t];
              "object" == typeof r && (r = JSON.stringify(r)),
                (i += '"' + (r + "").replace(/"/g, '""') + '",');
            }
            (i = i.slice(0, -1)), (r += i + "\r\n");
          }
          return r;
        })(this.trials);
      }
      json(e = !1) {
        return e
          ? JSON.stringify(this.trials, null, "\t")
          : JSON.stringify(this.trials);
      }
      localSave(e, t) {
        let i;
        if ("json" === (e = e.toLowerCase())) i = this.json();
        else {
          if ("csv" !== e)
            throw new Error(
              'Invalid format specified for localSave. Must be "json" or "csv".'
            );
          i = this.csv();
        }
        !(function (e, t) {
          const i = new Blob([e], { type: "text/plain" });
          let r = "";
          r =
            void 0 !== window.webkitURL
              ? window.webkitURL.createObjectURL(i)
              : window.URL.createObjectURL(i);
          const s = document.createElement("a");
          (s.id = "jspsych-download-as-text-link"),
            (s.style.display = "none"),
            (s.download = t),
            (s.href = r),
            s.click();
        })(i, t);
      }
    }
    class m {
      constructor(e) {
        (this.jsPsych = e), (this.dataProperties = {}), this.reset();
      }
      reset() {
        (this.allData = new p()), (this.interactionData = new p());
      }
      get() {
        return this.allData;
      }
      getInteractionData() {
        return this.interactionData;
      }
      write(e) {
        const t = this.jsPsych.getProgress(),
          i = this.jsPsych.getCurrentTrial(),
          r = {
            trial_type: i.type.info.name,
            trial_index: t.current_trial_global,
            time_elapsed: this.jsPsych.getTotalTime(),
            internal_node_id: this.jsPsych.getCurrentTimelineNodeID(),
          };
        this.allData.push(
          Object.assign(
            Object.assign(Object.assign(Object.assign({}, e), i.data), r),
            this.dataProperties
          )
        );
      }
      addProperties(e) {
        this.allData.addToAll(e),
          (this.dataProperties = Object.assign({}, this.dataProperties, e));
      }
      addDataToLastTrial(e) {
        this.allData.addToLast(e);
      }
      getDataByTimelineNode(e) {
        return this.allData.filterCustom(
          (t) => t.internal_node_id.slice(0, e.length) === e
        );
      }
      getLastTrialData() {
        return this.allData.top();
      }
      getLastTimelineData() {
        const e = this.getLastTrialData().select("internal_node_id").values[0];
        if (void 0 === e) return new p();
        {
          const t = e.substr(0, e.lastIndexOf("-"));
          return this.getDataByTimelineNode(t);
        }
      }
      displayData(e = "json") {
        "json" != (e = e.toLowerCase()) &&
          "csv" != e &&
          (console.log(
            "Invalid format declared for displayData function. Using json as default."
          ),
          (e = "json"));
        const t = "json" === e ? this.allData.json(!0) : this.allData.csv();
        (this.jsPsych.getDisplayElement().innerHTML =
          '<pre id="jspsych-data-display"></pre>'),
          (document.getElementById("jspsych-data-display").textContent = t);
      }
      urlVariables() {
        return (
          void 0 === this.query_string &&
            (this.query_string = (function () {
              const e = window.location.search.substr(1).split("&"),
                t = {};
              for (let i = 0; i < e.length; ++i) {
                const r = e[i].split("=", 2);
                1 == r.length
                  ? (t[r[0]] = "")
                  : (t[r[0]] = decodeURIComponent(r[1].replace(/\+/g, " ")));
              }
              return t;
            })()),
          this.query_string
        );
      }
      getURLVariable(e) {
        return this.urlVariables()[e];
      }
      createInteractionListeners() {
        window.addEventListener("blur", () => {
          const e = {
            event: "blur",
            trial: this.jsPsych.getProgress().current_trial_global,
            time: this.jsPsych.getTotalTime(),
          };
          this.interactionData.push(e),
            this.jsPsych.getInitSettings().on_interaction_data_update(e);
        }),
          window.addEventListener("focus", () => {
            const e = {
              event: "focus",
              trial: this.jsPsych.getProgress().current_trial_global,
              time: this.jsPsych.getTotalTime(),
            };
            this.interactionData.push(e),
              this.jsPsych.getInitSettings().on_interaction_data_update(e);
          });
        const e = () => {
          const e = {
            event:
              document.isFullScreen ||
              document.webkitIsFullScreen ||
              document.mozIsFullScreen ||
              document.fullscreenElement
                ? "fullscreenenter"
                : "fullscreenexit",
            trial: this.jsPsych.getProgress().current_trial_global,
            time: this.jsPsych.getTotalTime(),
          };
          this.interactionData.push(e),
            this.jsPsych.getInitSettings().on_interaction_data_update(e);
        };
        document.addEventListener("fullscreenchange", e),
          document.addEventListener("mozfullscreenchange", e),
          document.addEventListener("webkitfullscreenchange", e);
      }
      _customInsert(e) {
        this.allData = new p(e);
      }
      _fullreset() {
        this.reset(), (this.dataProperties = {});
      }
    }
    class f {
      constructor() {
        (this.hardwareConnected = !1),
          document.addEventListener("jspsych-activate", (e) => {
            this.hardwareConnected = !0;
          });
      }
      hardware(e) {
        const t = new CustomEvent("jspsych", { detail: e });
        document.dispatchEvent(t);
      }
    }
    class _ {
      constructor(e, t = !1, i = 0) {
        (this.getRootElement = e),
          (this.areResponsesCaseSensitive = t),
          (this.minimumValidRt = i),
          (this.listeners = new Set()),
          (this.heldKeys = new Set()),
          (this.areRootListenersRegistered = !1),
          a(this),
          this.registerRootListeners();
      }
      registerRootListeners() {
        if (!this.areRootListenersRegistered) {
          const e = this.getRootElement();
          e &&
            (e.addEventListener("keydown", this.rootKeydownListener),
            e.addEventListener("keyup", this.rootKeyupListener),
            (this.areRootListenersRegistered = !0));
        }
      }
      rootKeydownListener(e) {
        for (const t of Array.from(this.listeners)) t(e);
        this.heldKeys.add(this.toLowerCaseIfInsensitive(e.key));
      }
      toLowerCaseIfInsensitive(e) {
        return this.areResponsesCaseSensitive ? e : e.toLowerCase();
      }
      rootKeyupListener(e) {
        this.heldKeys.delete(this.toLowerCaseIfInsensitive(e.key));
      }
      isResponseValid(e, t, i) {
        return (
          !(!t && this.heldKeys.has(i)) &&
          ("ALL_KEYS" === e || ("NO_KEYS" !== e && e.includes(i)))
        );
      }
      getKeyboardResponse({
        callback_function: e,
        valid_responses: t = "ALL_KEYS",
        rt_method: i = "performance",
        persist: r,
        audio_context: s,
        audio_context_start_time: n,
        allow_held_key: o = !1,
        minimum_valid_rt: a = this.minimumValidRt,
      }) {
        "performance" !== i &&
          "audio" !== i &&
          (console.log(
            'Invalid RT method specified in getKeyboardResponse. Defaulting to "performance" method.'
          ),
          (i = "performance"));
        const l = "performance" === i ? performance.now() : 1e3 * n;
        this.registerRootListeners(),
          this.areResponsesCaseSensitive ||
            "string" == typeof t ||
            (t = t.map((e) => e.toLowerCase()));
        const h = (n) => {
          const c = Math.round(
            ("performance" == i ? performance.now() : 1e3 * s.currentTime) - l
          );
          if (c < a) return;
          const u = this.toLowerCaseIfInsensitive(n.key);
          this.isResponseValid(t, o, u) &&
            (n.preventDefault(),
            r || this.cancelKeyboardResponse(h),
            e({ key: u, rt: c }));
        };
        return this.listeners.add(h), h;
      }
      cancelKeyboardResponse(e) {
        this.listeners.delete(e);
      }
      cancelAllKeyboardResponses() {
        this.listeners.clear();
      }
      compareKeys(e, t) {
        if (
          !(
            ("string" != typeof e && null !== e) ||
            ("string" != typeof t && null !== t)
          )
        )
          return "string" == typeof e && "string" == typeof t
            ? this.areResponsesCaseSensitive
              ? e === t
              : e.toLowerCase() === t.toLowerCase()
            : null === e && null === t;
        console.error(
          "Error in jsPsych.pluginAPI.compareKeys: arguments must be key strings or null."
        );
      }
    }
    (e.ParameterType = void 0),
      ((c = e.ParameterType || (e.ParameterType = {}))[(c.BOOL = 0)] = "BOOL"),
      (c[(c.STRING = 1)] = "STRING"),
      (c[(c.INT = 2)] = "INT"),
      (c[(c.FLOAT = 3)] = "FLOAT"),
      (c[(c.FUNCTION = 4)] = "FUNCTION"),
      (c[(c.KEY = 5)] = "KEY"),
      (c[(c.KEYS = 6)] = "KEYS"),
      (c[(c.SELECT = 7)] = "SELECT"),
      (c[(c.HTML_STRING = 8)] = "HTML_STRING"),
      (c[(c.IMAGE = 9)] = "IMAGE"),
      (c[(c.AUDIO = 10)] = "AUDIO"),
      (c[(c.VIDEO = 11)] = "VIDEO"),
      (c[(c.OBJECT = 12)] = "OBJECT"),
      (c[(c.COMPLEX = 13)] = "COMPLEX"),
      (c[(c.TIMELINE = 14)] = "TIMELINE");
    const y = {
        data: {
          type: e.ParameterType.OBJECT,
          pretty_name: "Data",
          default: {},
        },
        on_start: {
          type: e.ParameterType.FUNCTION,
          pretty_name: "On start",
          default: function () {},
        },
        on_finish: {
          type: e.ParameterType.FUNCTION,
          pretty_name: "On finish",
          default: function () {},
        },
        on_load: {
          type: e.ParameterType.FUNCTION,
          pretty_name: "On load",
          default: function () {},
        },
        post_trial_gap: {
          type: e.ParameterType.INT,
          pretty_name: "Post trial gap",
          default: null,
        },
        css_classes: {
          type: e.ParameterType.STRING,
          pretty_name: "Custom CSS classes",
          default: null,
        },
      },
      g = [e.ParameterType.AUDIO, e.ParameterType.IMAGE, e.ParameterType.VIDEO];
    class v {
      constructor(e, t) {
        (this.useWebaudio = e),
          (this.webaudioContext = t),
          (this.video_buffers = {}),
          (this.context = null),
          (this.audio_buffers = []),
          (this.preload_requests = []),
          (this.img_cache = {}),
          (this.preloadMap = new Map());
      }
      getVideoBuffer(e) {
        return this.video_buffers[e];
      }
      initAudio() {
        this.context = this.useWebaudio ? this.webaudioContext : null;
      }
      audioContext() {
        return (
          null !== this.context &&
            "running" !== this.context.state &&
            this.context.resume(),
          this.context
        );
      }
      getAudioBuffer(e) {
        return new Promise((t, i) => {
          void 0 === this.audio_buffers[e] || "tmp" == this.audio_buffers[e]
            ? this.preloadAudio(
                [e],
                () => {
                  t(this.audio_buffers[e]);
                },
                () => {},
                (e) => {
                  i(e.error);
                }
              )
            : t(this.audio_buffers[e]);
        });
      }
      preloadAudio(e, t = () => {}, i = (e) => {}, r = (e) => {}) {
        e = l(e.flat());
        let s = 0;
        if (0 == e.length) return void t();
        const n = (n, o = 1) => {
            const a = new XMLHttpRequest();
            a.open("GET", n, !0),
              (a.responseType = "arraybuffer"),
              (a.onload = () => {
                this.context.decodeAudioData(
                  a.response,
                  (r) => {
                    (this.audio_buffers[n] = r),
                      s++,
                      i(n),
                      s == e.length && t();
                  },
                  (e) => {
                    r({ source: n, error: e });
                  }
                );
              }),
              (a.onerror = function (e) {
                let t = e;
                404 == this.status && (t = "404"), r({ source: n, error: t });
              }),
              (a.onloadend = function (e) {
                404 == this.status && r({ source: n, error: "404" });
              }),
              a.send(),
              this.preload_requests.push(a);
          },
          o = (n, o = 1) => {
            const a = new Audio(),
              l = () => {
                (this.audio_buffers[n] = a),
                  s++,
                  i(n),
                  s == e.length && t(),
                  a.removeEventListener("canplaythrough", l);
              };
            a.addEventListener("canplaythrough", l),
              a.addEventListener("error", function e(t) {
                r({ source: a.src, error: t }),
                  a.removeEventListener("error", e);
              }),
              a.addEventListener("abort", function e(t) {
                r({ source: a.src, error: t }),
                  a.removeEventListener("abort", e);
              }),
              (a.src = n),
              this.preload_requests.push(a);
          };
        for (const r of e)
          void 0 !== this.audio_buffers[r]
            ? (s++, i(r), s == e.length && t())
            : ((this.audio_buffers[r] = "tmp"),
              null !== this.audioContext() ? n(r) : o(r));
      }
      preloadImages(e, t = () => {}, i = (e) => {}, r = (e) => {}) {
        e = l(e.flat());
        var s = 0;
        if (0 !== e.length)
          for (var n = 0; n < e.length; n++) {
            var o = new Image();
            (o.onload = function () {
              s++, i(o.src), s === e.length && t();
            }),
              (o.onerror = function (e) {
                r({ source: o.src, error: e });
              }),
              (o.src = e[n]),
              (this.img_cache[e[n]] = o),
              this.preload_requests.push(o);
          }
        else t();
      }
      preloadVideo(e, t = () => {}, i = (e) => {}, r = (e) => {}) {
        e = l(e.flat());
        let s = 0;
        if (0 !== e.length)
          for (const n of e) {
            const o = this.video_buffers,
              a = new XMLHttpRequest();
            a.open("GET", n, !0),
              (a.responseType = "blob"),
              (a.onload = function () {
                if (200 === this.status || 0 === this.status) {
                  const r = this.response;
                  (o[n] = URL.createObjectURL(r)),
                    s++,
                    i(n),
                    s === e.length && t();
                }
              }),
              (a.onerror = function (e) {
                let t = e;
                404 == this.status && (t = "404"), r({ source: n, error: t });
              }),
              (a.onloadend = function (e) {
                404 == this.status && r({ source: n, error: "404" });
              }),
              a.send(),
              this.preload_requests.push(a);
          }
        else t();
      }
      getAutoPreloadList(t) {
        const i = Object.fromEntries(g.map((e) => [e, new Set()])),
          r = (e, t) => {
            var s, n, o, a;
            if (void 0 !== e.timeline)
              for (const i of e.timeline)
                r(i, null !== (s = e.type) && void 0 !== s ? s : t);
            else if (
              null === (o = null !== (n = e.type) && void 0 !== n ? n : t) ||
              void 0 === o
                ? void 0
                : o.info
            ) {
              const { name: r, parameters: s } = (
                null !== (a = e.type) && void 0 !== a ? a : t
              ).info;
              this.preloadMap.has(r) ||
                this.preloadMap.set(
                  r,
                  Object.fromEntries(
                    Object.entries(s)
                      .filter(
                        ([e, { type: t, preload: i }]) =>
                          g.includes(t) && (null == i || i)
                      )
                      .map(([e, { type: t }]) => [e, t])
                  )
                );
              for (const [t, s] of Object.entries(this.preloadMap.get(r))) {
                const r = e[t],
                  n = i[s];
                if ("string" == typeof r) n.add(r);
                else if (Array.isArray(r))
                  for (const e of r.flat()) "string" == typeof e && n.add(e);
              }
            }
          };
        return (
          r({ timeline: t }),
          {
            images: [...i[e.ParameterType.IMAGE]],
            audio: [...i[e.ParameterType.AUDIO]],
            video: [...i[e.ParameterType.VIDEO]],
          }
        );
      }
      cancelPreloads() {
        for (const e of this.preload_requests)
          (e.onload = () => {}),
            (e.onerror = () => {}),
            (e.oncanplaythrough = () => {}),
            (e.onabort = () => {});
        this.preload_requests = [];
      }
    }
    class b {
      constructor() {
        this.timeout_handlers = [];
      }
      setTimeout(e, t) {
        const i = window.setTimeout(e, t);
        return this.timeout_handlers.push(i), i;
      }
      clearAllTimeouts() {
        for (const e of this.timeout_handlers) clearTimeout(e);
        this.timeout_handlers = [];
      }
    }
    function w(e, t, i = !1) {
      const r = Array.isArray(e),
        s = Array.isArray(t);
      if (r)
        if (s) {
          if (e.length != t.length)
            if (
              (console.warn(
                "Unclear parameters given to randomization.repeat. Items and repetitions are unequal lengths. Behavior may not be as expected."
              ),
              t.length < e.length)
            ) {
              let i = [];
              for (let r = 0; r < e.length; r++) i.push(t);
              t = i;
            } else t = t.slice(0, e.length);
        } else {
          let i = [];
          for (let r = 0; r < e.length; r++) i.push(t);
          t = i;
        }
      else
        s
          ? ((t = [t[0]]),
            console.log(
              "Unclear parameters given to randomization.repeat. Multiple set sizes specified, but only one item exists to sample. Proceeding using the first set size."
            ))
          : ((e = [e]), (t = [t]));
      let n = [];
      for (let i = 0; i < e.length; i++)
        for (let r = 0; r < t[i]; r++)
          null == e[i] || "object" != typeof e[i]
            ? n.push(e[i])
            : n.push(Object.assign({}, e[i]));
      let o = T(n);
      return (
        i &&
          (o = (function (e) {
            const t = {};
            for (const i of e)
              for (const e of Object.keys(i))
                void 0 === t[e] && (t[e] = []), t[e].push(i[e]);
            return t;
          })(o)),
        o
      );
    }
    function T(e) {
      Array.isArray(e) ||
        console.error("Argument to shuffle() must be an array.");
      const t = e.slice(0);
      let i,
        r,
        s = t.length;
      for (; s; )
        (r = Math.floor(Math.random() * s--)),
          (i = t[s]),
          (t[s] = t[r]),
          (t[r] = i);
      return t;
    }
    function x(e, t = !1) {
      const i = e.length;
      if (1 == i)
        return (
          console.warn(
            "shuffleAlternateGroups() was called with only one group. Defaulting to simple shuffle."
          ),
          T(e[0])
        );
      let r = [];
      for (let e = 0; e < i; e++) r.push(e);
      t && (r = T(r));
      const s = [];
      let n = null;
      for (let t = 0; t < i; t++)
        (n = null === n ? e[t].length : Math.min(n, e[t].length)),
          s.push(T(e[t]));
      const o = [];
      for (let e = 0; e < n; e++)
        for (let t = 0; t < r.length; t++) o.push(s[r[t]][e]);
      return o;
    }
    function O(e, t) {
      return (
        Array.isArray(e) ||
          console.error(
            "First argument to sampleWithoutReplacement() must be an array"
          ),
        t > e.length &&
          console.error(
            "Cannot take a sample larger than the size of the set of items to sample."
          ),
        T(e).slice(0, t)
      );
    }
    function P(e, t, i) {
      Array.isArray(e) ||
        console.error(
          "First argument to sampleWithReplacement() must be an array"
        );
      const r = [];
      if (void 0 !== i) {
        i.length !== e.length &&
          console.error(
            "The length of the weights array must equal the length of the array to be sampled from."
          );
        let t = 0;
        for (const e of i) t += e;
        for (const e of i) r.push(e / t);
      } else for (let t = 0; t < e.length; t++) r.push(1 / e.length);
      const s = [r[0]];
      for (let e = 1; e < r.length; e++) s.push(r[e] + s[e - 1]);
      const n = [];
      for (let i = 0; i < t; i++) {
        const t = Math.random();
        let i = 0;
        for (; t > s[i]; ) i++;
        n.push(e[i]);
      }
      return n;
    }
    var j = Object.freeze({
      __proto__: null,
      repeat: w,
      shuffle: T,
      shuffleNoRepeats: function (e, t) {
        Array.isArray(e) ||
          console.error(
            "First argument to shuffleNoRepeats() must be an array."
          ),
          void 0 !== t &&
            "function" != typeof t &&
            console.error(
              "Second argument to shuffleNoRepeats() must be a function."
            ),
          void 0 === t &&
            (t = function (e, t) {
              return e === t;
            });
        const i = T(e);
        for (let e = 0; e < i.length - 1; e++)
          if (t(i[e], i[e + 1])) {
            let r = Math.floor(Math.random() * (i.length - 2)) + 1;
            for (
              ;
              t(i[e + 1], i[r]) ||
              t(i[e + 1], i[r + 1]) ||
              t(i[e + 1], i[r - 1]);

            )
              r = Math.floor(Math.random() * (i.length - 2)) + 1;
            const s = i[r];
            (i[r] = i[e + 1]), (i[e + 1] = s);
          }
        return i;
      },
      shuffleAlternateGroups: x,
      sampleWithoutReplacement: O,
      sampleWithReplacement: P,
      factorial: function (e, t = 1, i = !1) {
        let r = [{}];
        for (const [t, i] of Object.entries(e)) {
          const e = [];
          for (const s of i)
            for (const i of r)
              e.push(Object.assign(Object.assign({}, i), { [t]: s }));
          r = e;
        }
        return w(r, t, i);
      },
      randomID: function (e = 32) {
        let t = "";
        const i = "0123456789abcdefghjklmnopqrstuvwxyz";
        for (let r = 0; r < e; r++)
          t += i[Math.floor(Math.random() * i.length)];
        return t;
      },
    });
    function A() {
      const e = {
          previewMode: !1,
          outsideTurk: !1,
          hitId: "INVALID_URL_PARAMETER",
          assignmentId: "INVALID_URL_PARAMETER",
          workerId: "INVALID_URL_PARAMETER",
          turkSubmitTo: "INVALID_URL_PARAMETER",
        },
        t = function (e, t) {
          t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          const i = new RegExp("[\\?&]" + t + "=([^&#]*)").exec(e);
          return null == i ? "" : i[1];
        },
        i = t(window.location.href, "assignmentId")
          ? window.location.href
          : document.referrer;
      return (
        ["assignmentId", "hitId", "workerId", "turkSubmitTo"].map(function (r) {
          e[r] = unescape(t(i, r));
        }),
        (e.previewMode = "ASSIGNMENT_ID_NOT_AVAILABLE" == e.assignmentId),
        (e.outsideTurk =
          !e.previewMode &&
          "" === e.hitId &&
          "" == e.assignmentId &&
          "" == e.workerId),
        e
      );
    }
    var I = Object.freeze({
      __proto__: null,
      turkInfo: A,
      submitToTurk: function (e) {
        const t = A(),
          i = t.assignmentId,
          r = t.turkSubmitTo;
        if (!i || !r) return;
        const s = document.createElement("form");
        (s.method = "POST"),
          (s.action = r + "/mturk/externalSubmit?assignmentId=" + i);
        for (const t in e)
          if (e.hasOwnProperty(t)) {
            const i = document.createElement("input");
            (i.type = "hidden"),
              (i.name = t),
              (i.id = t),
              (i.value = e[t]),
              s.appendChild(i);
          }
        document.body.appendChild(s), s.submit();
      },
    });
    class E {
      constructor(e, t, i, r) {
        if (
          ((this.jsPsych = e),
          (this.progress = {
            current_location: -1,
            current_variable_set: 0,
            current_repetition: 0,
            current_iteration: 0,
            done: !1,
          }),
          (this.parent_node = i),
          (this.relative_id = void 0 === i ? 0 : r),
          void 0 !== t.timeline)
        ) {
          (this.timeline_parameters = {
            timeline: [],
            loop_function: t.loop_function,
            conditional_function: t.conditional_function,
            sample: t.sample,
            randomize_order: void 0 !== t.randomize_order && t.randomize_order,
            repetitions: void 0 === t.repetitions ? 1 : t.repetitions,
            timeline_variables:
              void 0 === t.timeline_variables ? [{}] : t.timeline_variables,
            on_timeline_finish: t.on_timeline_finish,
            on_timeline_start: t.on_timeline_start,
          }),
            this.setTimelineVariablesOrder();
          var s = Object.assign({}, t);
          delete s.timeline,
            delete s.conditional_function,
            delete s.loop_function,
            delete s.randomize_order,
            delete s.repetitions,
            delete s.timeline_variables,
            delete s.sample,
            delete s.on_timeline_start,
            delete s.on_timeline_finish,
            (this.node_trial_data = s);
          for (var n = 0; n < t.timeline.length; n++) {
            var o = Object.assign({}, s, t.timeline[n]);
            if (
              "object" == typeof s.data &&
              "object" == typeof t.timeline[n].data
            ) {
              var a = Object.assign({}, s.data, t.timeline[n].data);
              o.data = a;
            }
            this.timeline_parameters.timeline.push(
              new E(this.jsPsych, o, this, n)
            );
          }
        } else
          void 0 === t.type &&
            console.error(
              'Trial level node is missing the "type" parameter. The parameters for the node are: ' +
                JSON.stringify(t)
            ),
            (this.trial_parameters = Object.assign({}, t));
      }
      trial() {
        return void 0 === this.timeline_parameters
          ? h(this.trial_parameters)
          : this.progress.current_location >=
            this.timeline_parameters.timeline.length
          ? null
          : this.timeline_parameters.timeline[
              this.progress.current_location
            ].trial();
      }
      markCurrentTrialComplete() {
        void 0 === this.timeline_parameters
          ? (this.progress.done = !0)
          : this.timeline_parameters.timeline[
              this.progress.current_location
            ].markCurrentTrialComplete();
      }
      nextRepetiton() {
        this.setTimelineVariablesOrder(),
          (this.progress.current_location = -1),
          (this.progress.current_variable_set = 0),
          this.progress.current_repetition++;
        for (var e = 0; e < this.timeline_parameters.timeline.length; e++)
          this.timeline_parameters.timeline[e].reset();
      }
      setTimelineVariablesOrder() {
        const e = this.timeline_parameters;
        if (void 0 !== e && void 0 !== e.timeline_variables) {
          for (var t = [], i = 0; i < e.timeline_variables.length; i++)
            t.push(i);
          void 0 !== e.sample &&
            ("custom" == e.sample.type
              ? (t = e.sample.fn(t))
              : "with-replacement" == e.sample.type
              ? (t = P(t, e.sample.size, e.sample.weights))
              : "without-replacement" == e.sample.type
              ? (t = O(t, e.sample.size))
              : "fixed-repetitions" == e.sample.type
              ? (t = w(t, e.sample.size, !1))
              : "alternate-groups" == e.sample.type
              ? (t = x(e.sample.groups, e.sample.randomize_group_order))
              : console.error(
                  'Invalid type in timeline sample parameters. Valid options for type are "custom", "with-replacement", "without-replacement", "fixed-repetitions", and "alternate-groups"'
                )),
            e.randomize_order && (t = T(t)),
            (this.progress.order = t);
        }
      }
      nextSet() {
        (this.progress.current_location = -1),
          this.progress.current_variable_set++;
        for (var e = 0; e < this.timeline_parameters.timeline.length; e++)
          this.timeline_parameters.timeline[e].reset();
      }
      advance() {
        const e = this.progress,
          t = this.timeline_parameters,
          i = this.jsPsych.internal;
        if (e.done) return !0;
        if (-1 == e.current_location) {
          if (void 0 !== t) {
            if (
              void 0 !== t.conditional_function &&
              0 == e.current_repetition &&
              0 == e.current_variable_set
            ) {
              i.call_immediate = !0;
              var r = t.conditional_function();
              if (((i.call_immediate = !1), 0 == r)) return (e.done = !0), !0;
            }
            void 0 !== t.on_timeline_start &&
              0 == e.current_variable_set &&
              t.on_timeline_start();
          }
          return (e.current_location = 0), this.advance();
        }
        if (void 0 !== t) {
          for (var s = !1; e.current_location < t.timeline.length && 0 == s; ) {
            if (!t.timeline[e.current_location].advance()) return (s = !0), !1;
            e.current_location++;
          }
          return e.current_variable_set < e.order.length - 1
            ? (this.nextSet(), this.advance())
            : e.current_repetition < t.repetitions - 1
            ? (this.nextRepetiton(),
              void 0 !== t.on_timeline_finish && t.on_timeline_finish(),
              this.advance())
            : (void 0 !== t.on_timeline_finish && t.on_timeline_finish(),
              void 0 !== t.loop_function
                ? ((i.call_immediate = !0),
                  t.loop_function(this.generatedData())
                    ? (this.reset(),
                      (i.call_immediate = !1),
                      this.parent_node.advance())
                    : ((e.done = !0), (i.call_immediate = !1), !0))
                : ((e.done = !0), !0));
        }
      }
      isComplete() {
        return this.progress.done;
      }
      getTimelineVariableValue(e) {
        if (void 0 !== this.timeline_parameters)
          return this.timeline_parameters.timeline_variables[
            this.progress.order[this.progress.current_variable_set]
          ][e];
      }
      findTimelineVariable(e) {
        var t = this.getTimelineVariableValue(e);
        return void 0 === t
          ? void 0 !== this.parent_node
            ? this.parent_node.findTimelineVariable(e)
            : void 0
          : t;
      }
      timelineVariable(e) {
        if (void 0 === this.timeline_parameters)
          return this.findTimelineVariable(e);
        var t = Math.max(0, this.progress.current_location);
        return (
          t == this.timeline_parameters.timeline.length && (t -= 1),
          this.timeline_parameters.timeline[t].timelineVariable(e)
        );
      }
      allTimelineVariables() {
        for (
          var e = this.allTimelineVariablesNames(), t = {}, i = 0;
          i < e.length;
          i++
        )
          t[e[i]] = this.timelineVariable(e[i]);
        return t;
      }
      allTimelineVariablesNames(e = []) {
        if (void 0 !== this.timeline_parameters) {
          e = e.concat(
            Object.keys(
              this.timeline_parameters.timeline_variables[
                this.progress.order[this.progress.current_variable_set]
              ]
            )
          );
          var t = Math.max(0, this.progress.current_location);
          return (
            t == this.timeline_parameters.timeline.length && (t -= 1),
            this.timeline_parameters.timeline[t].allTimelineVariablesNames(e)
          );
        }
        if (void 0 === this.timeline_parameters) return e;
      }
      length() {
        var e = 0;
        if (void 0 === this.timeline_parameters) return 1;
        for (var t = 0; t < this.timeline_parameters.timeline.length; t++)
          e += this.timeline_parameters.timeline[t].length();
        return e;
      }
      percentComplete() {
        for (
          var e = this.length(), t = 0, i = 0;
          i < this.timeline_parameters.timeline.length;
          i++
        )
          this.timeline_parameters.timeline[i].isComplete() &&
            (t += this.timeline_parameters.timeline[i].length());
        return (t / e) * 100;
      }
      reset() {
        if (
          ((this.progress.current_location = -1),
          (this.progress.current_repetition = 0),
          (this.progress.current_variable_set = 0),
          this.progress.current_iteration++,
          (this.progress.done = !1),
          this.setTimelineVariablesOrder(),
          void 0 !== this.timeline_parameters)
        )
          for (var e = 0; e < this.timeline_parameters.timeline.length; e++)
            this.timeline_parameters.timeline[e].reset();
      }
      end() {
        this.progress.done = !0;
      }
      endActiveNode() {
        void 0 === this.timeline_parameters
          ? (this.end(), this.parent_node.end())
          : this.timeline_parameters.timeline[
              this.progress.current_location
            ].endActiveNode();
      }
      ID() {
        var e = "";
        return void 0 === this.parent_node
          ? "0." + this.progress.current_iteration
          : ((e += this.parent_node.ID() + "-"),
            (e += this.relative_id + "." + this.progress.current_iteration));
      }
      activeID() {
        return void 0 === this.timeline_parameters
          ? this.ID()
          : this.timeline_parameters.timeline[
              this.progress.current_location
            ].activeID();
      }
      generatedData() {
        return this.jsPsych.data.getDataByTimelineNode(this.ID());
      }
      trialsOfType(e) {
        if (void 0 === this.timeline_parameters)
          return this.trial_parameters.type == e ? this.trial_parameters : [];
        for (
          var t = [], i = 0;
          i < this.timeline_parameters.timeline.length;
          i++
        ) {
          var r = this.timeline_parameters.timeline[i].trialsOfType(e);
          t = t.concat(r);
        }
        return t;
      }
      insert(e) {
        void 0 === this.timeline_parameters
          ? console.error("Cannot add new trials to a trial-level node.")
          : this.timeline_parameters.timeline.push(
              new E(
                this.jsPsych,
                Object.assign(Object.assign({}, this.node_trial_data), e),
                this,
                this.timeline_parameters.timeline.length
              )
            );
      }
    }
    function L(e) {
      return new Promise((t) => setTimeout(t, e));
    }
    class D {
      constructor(e) {
        (this.extensions = {}),
          (this.turk = I),
          (this.randomization = j),
          (this.utils = u),
          (this.opts = {}),
          (this.global_trial_index = 0),
          (this.current_trial = {}),
          (this.current_trial_finished = !1),
          (this.paused = !1),
          (this.waiting = !1),
          (this.file_protocol = !1),
          (this.webaudio_context = null),
          (this.internal = { call_immediate: !1 }),
          (this.progress_bar_amount = 0),
          (e = Object.assign(
            {
              display_element: void 0,
              on_finish: () => {},
              on_trial_start: () => {},
              on_trial_finish: () => {},
              on_data_update: () => {},
              on_interaction_data_update: () => {},
              on_close: () => {},
              use_webaudio: !0,
              exclusions: {},
              show_progress_bar: !1,
              message_progress_bar: "Completion Progress",
              auto_update_progress_bar: !0,
              default_iti: 0,
              minimum_valid_rt: 0,
              experiment_width: null,
              override_safe_mode: !1,
              case_sensitive_responses: !1,
              extensions: [],
            },
            e
          )),
          (this.opts = e),
          a(this),
          (this.webaudio_context =
            "undefined" != typeof window && void 0 !== window.AudioContext
              ? new AudioContext()
              : null),
          "file:" != window.location.protocol ||
            (!1 !== e.override_safe_mode && void 0 !== e.override_safe_mode) ||
            ((e.use_webaudio = !1),
            (this.file_protocol = !0),
            console.warn(
              "jsPsych detected that it is running via the file:// protocol and not on a web server. To prevent issues with cross-origin requests, Web Audio and video preloading have been disabled. If you would like to override this setting, you can set 'override_safe_mode' to 'true' in initJsPsych. For more information, see: https://www.jspsych.org/overview/running-experiments"
            )),
          (this.data = new m(this)),
          (this.pluginAPI = (function (e) {
            const t = e.getInitSettings();
            return Object.assign(
              {},
              ...[
                new _(
                  e.getDisplayContainerElement,
                  t.case_sensitive_responses,
                  t.minimum_valid_rt
                ),
                new b(),
                new v(t.use_webaudio, e.webaudio_context),
                new f(),
              ].map((e) => a(e))
            );
          })(this));
        for (const t of e.extensions)
          this.extensions[t.type.info.name] = new t.type(this);
        this.pluginAPI.initAudio();
      }
      version() {
        return "7.0.0";
      }
      run(e) {
        return n(this, void 0, void 0, function* () {
          void 0 === e &&
            console.error(
              "No timeline declared in jsPsych.run. Cannot start experiment."
            ),
            0 === e.length &&
              console.error(
                "No trials have been added to the timeline (the timeline is an empty array). Cannot start experiment."
              ),
            (this.timelineDescription = e),
            (this.timeline = new E(this, { timeline: e })),
            yield this.prepareDom(),
            yield this.checkExclusions(this.opts.exclusions),
            yield this.loadExtensions(this.opts.extensions),
            document.documentElement.setAttribute("jspsych", "present"),
            this.startExperiment(),
            yield this.finished;
        });
      }
      getProgress() {
        return {
          total_trials:
            void 0 === this.timeline ? void 0 : this.timeline.length(),
          current_trial_global: this.global_trial_index,
          percent_complete:
            void 0 === this.timeline ? 0 : this.timeline.percentComplete(),
        };
      }
      getStartTime() {
        return this.exp_start_time;
      }
      getTotalTime() {
        return void 0 === this.exp_start_time
          ? 0
          : new Date().getTime() - this.exp_start_time.getTime();
      }
      getDisplayElement() {
        return this.DOM_target;
      }
      getDisplayContainerElement() {
        return this.DOM_container;
      }
      finishTrial(e = {}) {
        if (this.current_trial_finished) return;
        (this.current_trial_finished = !0),
          void 0 !== this.current_trial.css_classes &&
            Array.isArray(this.current_trial.css_classes) &&
            this.DOM_target.classList.remove(...this.current_trial.css_classes),
          this.data.write(e);
        const t = this.data
            .get()
            .filter({ trial_index: this.global_trial_index })
            .values()[0],
          i = this.current_trial;
        if ("object" == typeof i.save_trial_parameters)
          for (const e of Object.keys(i.save_trial_parameters)) {
            const r = i.save_trial_parameters[e];
            !0 === r &&
              (void 0 === i[e]
                ? console.warn(
                    `Invalid parameter specified in save_trial_parameters. Trial has no property called "${e}".`
                  )
                : "function" == typeof i[e]
                ? (t[e] = i[e].toString())
                : (t[e] = i[e])),
              !1 === r &&
                "internal_node_id" !== e &&
                "trial_index" !== e &&
                delete t[e];
          }
        if (Array.isArray(i.extensions))
          for (const e of i.extensions) {
            const i = this.extensions[e.type.info.name].on_finish(e.params);
            Object.assign(t, i);
          }
        (this.internal.call_immediate = !0),
          "function" == typeof i.on_finish && i.on_finish(t),
          this.opts.on_trial_finish(t),
          this.opts.on_data_update(t),
          (this.internal.call_immediate = !1),
          null === typeof i.post_trial_gap || void 0 === i.post_trial_gap
            ? this.opts.default_iti > 0
              ? setTimeout(this.nextTrial, this.opts.default_iti)
              : this.nextTrial()
            : i.post_trial_gap > 0
            ? setTimeout(this.nextTrial, i.post_trial_gap)
            : this.nextTrial();
      }
      endExperiment(e) {
        (this.timeline.end_message = e),
          this.timeline.end(),
          this.pluginAPI.cancelAllKeyboardResponses(),
          this.pluginAPI.clearAllTimeouts(),
          this.finishTrial();
      }
      endCurrentTimeline() {
        this.timeline.endActiveNode();
      }
      getCurrentTrial() {
        return this.current_trial;
      }
      getInitSettings() {
        return this.opts;
      }
      getCurrentTimelineNodeID() {
        return this.timeline.activeID();
      }
      timelineVariable(e, t = !1) {
        return this.internal.call_immediate || !0 === t
          ? this.timeline.timelineVariable(e)
          : {
              timelineVariablePlaceholder: !0,
              timelineVariableFunction: () => this.timeline.timelineVariable(e),
            };
      }
      getAllTimelineVariables() {
        return this.timeline.allTimelineVariables();
      }
      addNodeToEndOfTimeline(e, t) {
        this.timeline.insert(e);
      }
      pauseExperiment() {
        this.paused = !0;
      }
      resumeExperiment() {
        (this.paused = !1),
          this.waiting && ((this.waiting = !1), this.nextTrial());
      }
      loadFail(e) {
        (e = e || "<p>The experiment failed to load.</p>"),
          (this.DOM_target.innerHTML = e);
      }
      getSafeModeStatus() {
        return this.file_protocol;
      }
      getTimeline() {
        return this.timelineDescription;
      }
      prepareDom() {
        return n(this, void 0, void 0, function* () {
          "complete" !== document.readyState &&
            (yield new Promise((e) => {
              window.addEventListener("load", e);
            }));
          const e = this.opts;
          if (void 0 === e.display_element) {
            null === document.querySelector("body") &&
              document.documentElement.appendChild(
                document.createElement("body")
              ),
              (document.querySelector("html").style.height = "100%"),
              (document.querySelector("body").style.margin = "0px"),
              (document.querySelector("body").style.height = "100%"),
              (document.querySelector("body").style.width = "100%"),
              (e.display_element = document.querySelector("body"));
          } else {
            const t =
              e.display_element instanceof Element
                ? e.display_element
                : document.querySelector("#" + e.display_element);
            null === t
              ? console.error(
                  "The display_element specified in initJsPsych() does not exist in the DOM."
                )
              : (e.display_element = t);
          }
          (e.display_element.innerHTML =
            '<div class="jspsych-content-wrapper"><div id="jspsych-content"></div></div>'),
            (this.DOM_container = e.display_element),
            (this.DOM_target = document.querySelector("#jspsych-content")),
            null !== e.experiment_width &&
              (this.DOM_target.style.width = e.experiment_width + "px"),
            (e.display_element.tabIndex = 0),
            -1 ===
              e.display_element.className.indexOf("jspsych-display-element") &&
              (e.display_element.className += " jspsych-display-element"),
            (this.DOM_target.className += "jspsych-content"),
            this.data.createInteractionListeners(),
            window.addEventListener("beforeunload", e.on_close);
        });
      }
      loadExtensions(e) {
        return n(this, void 0, void 0, function* () {
          try {
            yield Promise.all(
              e.map((e) =>
                this.extensions[e.type.info.name].initialize(e.params || {})
              )
            );
          } catch (e) {
            throw (console.error(e), new Error(e));
          }
        });
      }
      startExperiment() {
        (this.finished = new Promise((e) => {
          this.resolveFinishedPromise = e;
        })),
          !0 === this.opts.show_progress_bar &&
            this.drawProgressBar(this.opts.message_progress_bar),
          (this.exp_start_time = new Date()),
          this.timeline.advance(),
          this.doTrial(this.timeline.trial());
      }
      finishExperiment() {
        const e = this.opts.on_finish(this.data.get()),
          t = () => {
            void 0 !== this.timeline.end_message &&
              (this.DOM_target.innerHTML = this.timeline.end_message),
              this.resolveFinishedPromise();
          };
        e ? Promise.resolve(e).then(t) : t();
      }
      nextTrial() {
        if (this.paused) return void (this.waiting = !0);
        this.global_trial_index++, this.timeline.markCurrentTrialComplete();
        const e = this.timeline.advance();
        !0 === this.opts.show_progress_bar &&
          !0 === this.opts.auto_update_progress_bar &&
          this.updateProgressBar(),
          e ? this.finishExperiment() : this.doTrial(this.timeline.trial());
      }
      doTrial(e) {
        if (
          ((this.current_trial = e),
          (this.current_trial_finished = !1),
          this.evaluateTimelineVariables(e),
          (e.type = Object.assign(Object.assign({}, a(new e.type(this))), {
            info: e.type.info,
          })),
          this.evaluateFunctionParameters(e),
          this.setDefaultValues(e),
          (this.internal.call_immediate = !0),
          this.opts.on_trial_start(e),
          "function" == typeof e.on_start && e.on_start(e),
          Array.isArray(e.extensions))
        )
          for (const t of e.extensions)
            this.extensions[t.type.info.name].on_start(t.params);
        this.DOM_container.focus(),
          (this.DOM_target.scrollTop = 0),
          void 0 !== e.css_classes &&
            (Array.isArray(e.css_classes) ||
              "string" != typeof e.css_classes ||
              (e.css_classes = [e.css_classes]),
            Array.isArray(e.css_classes) &&
              this.DOM_target.classList.add(...e.css_classes));
        const t = () => {
            if (
              ("function" == typeof e.on_load && e.on_load(),
              Array.isArray(e.extensions))
            )
              for (const t of e.extensions)
                this.extensions[t.type.info.name].on_load(t.params);
          },
          i = e.type.trial(this.DOM_target, e, t);
        (i && "function" == typeof i.then) || t(),
          (this.internal.call_immediate = !1);
      }
      evaluateTimelineVariables(e) {
        for (const t of Object.keys(e))
          "object" == typeof e[t] &&
            null !== e[t] &&
            void 0 !== e[t].timelineVariablePlaceholder &&
            (e[t] = e[t].timelineVariableFunction()),
            "object" == typeof e[t] &&
              null !== e[t] &&
              this.evaluateTimelineVariables(e[t]);
      }
      evaluateFunctionParameters(t) {
        this.internal.call_immediate = !0;
        for (const i of Object.keys(t))
          "type" !== i &&
            (void 0 !== y[i] &&
              y[i].type !== e.ParameterType.FUNCTION &&
              (t[i] = this.replaceFunctionsWithValues(t[i], null)),
            void 0 !== t.type.info.parameters[i] &&
              t.type.info.parameters[i].type !== e.ParameterType.FUNCTION &&
              (t[i] = this.replaceFunctionsWithValues(
                t[i],
                t.type.info.parameters[i]
              )));
        this.internal.call_immediate = !1;
      }
      replaceFunctionsWithValues(t, i) {
        if (null === t) return t;
        if (Array.isArray(t))
          for (let e = 0; e < t.length; e++)
            t[e] = this.replaceFunctionsWithValues(t[e], i);
        else if ("object" == typeof t)
          if (null !== i && i.nested)
            for (const r of Object.keys(t))
              "object" == typeof i.nested[r] &&
                i.nested[r].type !== e.ParameterType.FUNCTION &&
                (t[r] = this.replaceFunctionsWithValues(t[r], i.nested[r]));
          else
            for (const e of Object.keys(t))
              "type" !== e &&
                (t[e] = this.replaceFunctionsWithValues(t[e], null));
        else if ("function" == typeof t) return t();
        return t;
      }
      setDefaultValues(t) {
        for (const i in t.type.info.parameters)
          t.type.info.parameters[i].type === e.ParameterType.COMPLEX
            ? !0 === t.type.info.parameters[i].array &&
              t[i].forEach(function (e, r) {
                for (const e in t.type.info.parameters[i].nested)
                  (void 0 !== t[i][r][e] && null !== t[i][r][e]) ||
                    (void 0 === t.type.info.parameters[i].nested[e].default
                      ? console.error(
                          "You must specify a value for the " +
                            e +
                            " parameter (nested in the " +
                            i +
                            " parameter) in the " +
                            t.type +
                            " plugin."
                        )
                      : (t[i][r][e] =
                          t.type.info.parameters[i].nested[e].default));
              })
            : (void 0 !== t[i] && null !== t[i]) ||
              (void 0 === t.type.info.parameters[i].default
                ? console.error(
                    "You must specify a value for the " +
                      i +
                      " parameter in the " +
                      t.type.info.name +
                      " plugin."
                  )
                : (t[i] = t.type.info.parameters[i].default));
      }
      checkExclusions(e) {
        return n(this, void 0, void 0, function* () {
          if (e.min_width || e.min_height) {
            const t = e.min_width || 0,
              i = e.min_height || 0;
            if (window.innerWidth < t || window.innerHeight < i) {
              for (
                this.getDisplayElement().innerHTML =
                  "<p>Your browser window is too small to complete this experiment. Please maximize the size of your browser window. If your browser window is already maximized, you will not be able to complete this experiment.</p><p>The minimum width is " +
                  t +
                  "px. Your current width is " +
                  window.innerWidth +
                  "px.</p><p>The minimum height is " +
                  i +
                  "px. Your current height is " +
                  window.innerHeight +
                  "px.</p>";
                window.innerWidth < t || window.innerHeight < i;

              )
                yield L(100);
              this.getDisplayElement().innerHTML = "";
            }
          }
          if (
            void 0 !== e.audio &&
            e.audio &&
            !window.hasOwnProperty("AudioContext") &&
            !window.hasOwnProperty("webkitAudioContext")
          )
            throw (
              ((this.getDisplayElement().innerHTML =
                "<p>Your browser does not support the WebAudio API, which means that you will not be able to complete the experiment.</p><p>Browsers that support the WebAudio API include Chrome, Firefox, Safari, and Edge.</p>"),
              new Error())
            );
        });
      }
      drawProgressBar(e) {
        document
          .querySelector(".jspsych-display-element")
          .insertAdjacentHTML(
            "afterbegin",
            '<div id="jspsych-progressbar-container"><span>' +
              e +
              '</span><div id="jspsych-progressbar-outer"><div id="jspsych-progressbar-inner"></div></div></div>'
          );
      }
      updateProgressBar() {
        this.setProgressBar(this.getProgress().percent_complete / 100);
      }
      setProgressBar(e) {
        (e = Math.max(Math.min(1, e), 0)),
          (document.querySelector("#jspsych-progressbar-inner").style.width =
            100 * e + "%"),
          (this.progress_bar_amount = e);
      }
      getProgressBarCompleted() {
        return this.progress_bar_amount;
      }
    }
    return (
      "undefined" != typeof window &&
        window.hasOwnProperty("webkitAudioContext") &&
        !window.hasOwnProperty("AudioContext") &&
        (window.AudioContext = webkitAudioContext),
      (e.JsPsych = D),
      (e.initJsPsych = function (e) {
        return new D(e);
      }),
      (e.universalPluginParameters = y),
      Object.defineProperty(e, "__esModule", { value: !0 }),
      e
    );
  })({}),
  initJsPsych = jsPsychModule.initJsPsych;
//# sourceMappingURL=index.browser.min.js.map
