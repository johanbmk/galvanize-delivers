let subtotal = 0;

// "Add to order" event listeners and handlers
for (var id of ["burger", "ribs", "pizza", "ice_cream"]) {
  $(`#order-${id}`).click((event) => {
    event.preventDefault(); // so <a href="#"> does not scroll

    // Get choice name and price
    let choiceName = event.target.parentElement.parentElement.children[1].children[0].innerText;
    let choicePriceText = event.target.parentElement.parentElement.children[1].children[1].innerText;

    // Add to the table of orders
    var tr = $('<tr>');
    tr.append($('<td>').text(choiceName));
    tr.append($('<td class="right-align">').text(choicePriceText));
    $('#table-of-orders tbody').append(tr);

    // Update subtotal
    let price = Number(choicePriceText.replace(/\$(\d+\.\d+)/, '$1'));
    subtotal += price;
    let subtotalText = '$' + subtotal.toFixed(2);
    $('#subtotal').text(subtotalText);

    // Update tax
    let tax = subtotal * 0.08;
    let taxText = '$' + tax.toFixed(2);
    $('#tax').text(taxText);

    // Update total
    let total = subtotal + tax;
    let totalText = '$' + total.toFixed(2);
    $('#total').text(totalText);
  });
}


// "Place order" button. Event listener and handler.
$('#order-button').click((event) => {
  event.preventDefault(); // so <a href="#"> does not scroll
  if (subtotal === 0) {
    Materialize.toast('No order was placed. There is currently nothing in the order list.', 4000);
  } else {
    Materialize.toast('Your order has been placed. Bon appetit!', 4000);

    // Reset order button to prevent duplicate orders
    $('#order-button').off('click');
    $('#order-button').click((event) => {
      event.preventDefault(); // so <a href="#"> does not scroll
      Materialize.toast('This order was already placed, but please click one more time if you want to start another order.', 5000);

      // Reset again to just make a link to reload page.
      $('#order-button').off('click');
    });
  }
});


// To make a hamburger menu for small screens
$(document).ready(function() {
  $(".button-collapse").sideNav();
});
