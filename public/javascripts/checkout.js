Stripe.setPublishableKey('pk_test_ZfoVIEPhVPICQAC9b5Fce3wB00yDnujiMN');
var $form = $('#checkout-form');

$form.submit((event) => {
    $('#charge-error').addClass('hidden');
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        name: $('#cart-name').val()
    }, stripeResponseHandler);
    return false;
});

function stripeResponseHandler(status, response) {
    if(response.error){
        $('#charge-error').text(response.error.message);
        $('#charge-error').removeClass('hidden');
        $form.find('button').prop('disabled', false);
    }else {
        var token = response.id;
        $form.append($('<input type="hidden" name="stripeToken" />').val(token))
        $form.get(0).submit();
    }
}
