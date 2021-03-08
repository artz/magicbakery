// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () {};
  var methods = [
    "assert",
    "clear",
    "count",
    "debug",
    "dir",
    "dirxml",
    "error",
    "exception",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "markTimeline",
    "profile",
    "profileEnd",
    "table",
    "time",
    "timeEnd",
    "timeline",
    "timelineEnd",
    "timeStamp",
    "trace",
    "warn",
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
})();

import jquery from "jquery";
window.$ = window.jQuery = jquery;
(function ($) {
  $.fn.magicQuantity = function () {
    let total = 0;
    return this.each((i, el) => {
      let count = 0;
      const $el = $(el);
      const $div = $('<div class="quantity"></div>');
      const $add = $("<button>+</button>");
      const $subtract = $("<button>-</button>");
      const $quantity = $("<span>0</span>");

      $el.click(() => {
        $quantity.text(count);
        $el.trigger("total", total);
      });
      $add.click(() => {
        count += 1;
        total += 1;
      });
      $subtract.click(() => {
        if (count > 0) {
          count -= 1;
          total -= 1;
        }
      });

      $div.append($subtract);
      $div.append($quantity);
      $div.append($add);
      $el.append($div);
    });
  };
})(jQuery);
