(function ($) {
  const $total = $(".total > b");
  const $inputs = $("input.magic-quantity");
  const $payment = $(".payment").hide();
  const $products = $(".product");

  // Delivery date
  const $delivery = $(".delivery input");
  const deliveryDate = new Date();
  deliveryDate.setDate(new Date().getDate() + 2);
  const padZero = (number) => {
    return number > 9 ? number : "0" + number;
  };
  const minDate = `${deliveryDate.getFullYear()}-${padZero(
    deliveryDate.getMonth()
  )}-${padZero(deliveryDate.getDate())}`;
  $delivery.val(minDate);
  $delivery.attr("min", minDate);

  $("form").on("submit", (event) => {
    event.preventDefault();
  });

  let value = 0;

  $inputs.magicQuantity().on("total", (evt, total) => {
    $total.text(`$${total}`);
    if (total) {
      $payment.fadeIn();
    } else {
      $payment.fadeOut();
    }
    value = total;
  });

  function getDeliveryDate() {
    const date = new Date($delivery.val());
    return date.toLocaleDateString();
  }

  function getPurchaseUnits() {
    let items = [];
    let total = 0;
    const currency_code = "USD";
    $products.each((i, el) => {
      const $product = $(el);
      const $input = $product.find("input");
      const quantity = parseInt($input.val());
      const price = parseInt($input.data("price"));
      const name = $product.find("h3").text();
      if (quantity) {
        total += quantity * price;
        items.push({
          name,
          quantity,
          unit_amount: {
            currency_code,
            value: price,
          },
        });
      }
    });
    items.push({
      name: `Delivery: ${getDeliveryDate()}`,
      quantity: 1,
      unit_amount: {
        currency_code,
        value: 0,
      },
    });
    const purchaseUnits = [
      {
        description: `Order for ${getDeliveryDate()}`,
        amount: {
          currency_code,
          value: total,
          breakdown: {
            item_total: {
              currency_code,
              value: total,
            },
          },
        },
        items,
      },
    ];
    console.log(purchaseUnits);
    return purchaseUnits;
  }

  // https://developer.paypal.com/docs/api/orders/v2/
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
          purchase_units: getPurchaseUnits(),
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
