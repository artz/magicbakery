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
    const $elems = this;
    function calculateTotal() {
      let total = 0;
      $elems.each((i, elem) => {
        total += parseInt(elem.value) * elem.getAttribute("data-price");
      });
      return total;
    }
    return $elems.each((i, el) => {
      const $el = $(el);
      const $div = $('<div class="magic-quantity"></div>');
      const $controls = $('<div class="controls"></div>');
      const $add = $('<button class="add">+</button>');
      const $subtract = $('<button class="subtract">-</button>');
      const price = parseInt($el.data("price"));
      const $price = $(`<div class="price">$${price} each</div>`);

      $add.on("click", () => {
        $el.val(parseInt($el.val()) + 1);
        $subtract.prop("disabled", false);
        $el.trigger("total", calculateTotal());
      });

      $subtract.on("click", () => {
        const value = parseInt($el.val());
        if (value > 0) {
          $el.val(value - 1);
        }
        $subtract.prop("disabled", parseInt($el.val()) === 0);
        $el.trigger("total", calculateTotal());
      });

      el.addEventListener("keyup", () => {
        $el.trigger("total", calculateTotal());
      });
      el.addEventListener("blur", () => {
        $el.trigger("total", calculateTotal());
      });

      $el.replaceWith($div);
      $controls.append($subtract);
      $controls.append($el);
      $controls.append($add);
      $div.append($controls);
      $div.append($price);
    });
  };
})(jQuery);
