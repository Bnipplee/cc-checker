// Replace 'pk_test_your_publishable_key' with your actual publishable key from Stripe

var stripe = Stripe('pk_test_51MfbkrSFbL36yI30mm0wBkiMtGlHsvRjg ptjwBHJghyt6ZNJ3cGG2M01eUDmJCmKbGJySzYNya5Lu6KIWYHsHgqq00dDQoaUMf');

document.getElementById('cardForm').addEventListener('submit', function(event) {

  event.preventDefault(); // Prevent form submission

  var cardNumber = document.getElementById('cardNumber').value;

  var expiryDate = document.getElementById('expiryDate').value;

  var cvv = document.getElementById('cvv').value;

  

  // Create a token with the card details

  stripe.createToken('card', {

    number: cardNumber,

    exp_month: expiryDate.split('/')[0],

    exp_year: expiryDate.split('/')[1],

    cvc: cvv

  }).then(function(result) {

    // Handle the response from Stripe

    if (result.error) {

      // Display an error message if card verification fails

      var resultDiv = document.getElementById('result');

      resultDiv.textContent = 'Error: ' + result.error.message;

    } else {

      // Retrieve the card owner details from the token

      var token = result.token;

      var cardOwnerName = token.card.name;

      var cardOwnerLocation = token.card.address_city + ', ' + token.card.address_country;

      var cardType = token.card.brand;

      // Display the card owner details on the page

      var resultDiv = document.getElementById('result');

      resultDiv.textContent = 'Card Owner: ' + cardOwnerName + '\nLocation: ' + cardOwnerLocation + '\nCard Type: ' + cardType;

    }

  });

});

