var jsPsychCallFunction = (function (n) {
  "use strict";
  function e(n, e) {
    for (var t = 0; t < e.length; t++) {
      var a = e[t];
      (a.enumerable = a.enumerable || !1),
        (a.configurable = !0),
        "value" in a && (a.writable = !0),
        Object.defineProperty(n, a.key, a);
    }
  }
  var t = {
      name: "call-function",
      parameters: {
        func: {
          type: n.ParameterType.FUNCTION,
          pretty_name: "Function",
          default: void 0,
        },
        async: {
          type: n.ParameterType.BOOL,
          pretty_name: "Asynchronous",
          default: !1,
        },
      },
    },
    a = (function () {
      function n(e) {
        !(function (n, e) {
          if (!(n instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, n),
          (this.jsPsych = e);
      }
      var t, a, r;
      return (
        (t = n),
        (a = [
          {
            key: "trial",
            value: function (n, e) {
              var t,
                a = this,
                r = function () {
                  var n = { value: t };
                  a.jsPsych.finishTrial(n);
                };
              e.async
                ? e.func(function (n) {
                    (t = n), r();
                  })
                : ((t = e.func()), r());
            },
          },
        ]) && e(t.prototype, a),
        r && e(t, r),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        n
      );
    })();
  return (a.info = t), a;
})(jsPsychModule);
//# sourceMappingURL=index.browser.min.js.map
