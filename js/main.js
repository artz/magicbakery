(function ($) {
  const $total = $(".total > b");
  let value = 0;
  const $paypal = $("#paypal-buttons").hide();
  const $products = $("section.product");
  $products.magicQuantity().on("total", (evt, total) => {
    value = total * 2;
    $total.text(`$${value}`);
    if (value) {
      $paypal.fadeIn();
    } else {
      $paypal.fadeOut();
    }
  });

  function getDescription() {
    let description = [];
    $products.each((i, el) => {
      const $product = $(el);
      const quantity = parseInt($product.find(".quantity > span").text());
      if (quantity) {
        description.push(`${quantity} ${$product.find("h3").text()}`);
      }
    });
    return description.join(", ");
  }

  paypal
    .Buttons({
      style: {
        shape: "rect",
        color: "blue",
        layout: "vertical",
        label: "pay",
      },
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              description: getDescription(),
              amount: { value },
            },
          ],
        });
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          alert(
            "Transaction completed by " + details.payer.name.given_name + "!"
          );
        });
      },
    })
    .render("#paypal-buttons");
})(jQuery);
