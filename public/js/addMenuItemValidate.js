$(document).ready(function() {

    $('#RegisterForm').submit(function(e) {
      e.preventDefault();
      /* for now, we do not submit the form because the server side piece is not ready
      once server side code is ready, the submission of the form will be done provided
      the validation succeeds
      TODO: change this when server side code is ready
      */ 
      var inputName = $('#inputName').val();
      var inputItemPrice = $('#inputItemPrice').val();
      var negativePrice = Math.sign(inputItemPrice);
       
      $(".error").remove();
      var err = false;
      if (inputName.length < 1) {
          $('#inputName').after('<span class="error">Please enter Item name.</span>');
          err = true;
      }
      if (inputItemPrice.length < 1) {
          $('#inputItemPrice').after('<span class="error">Please enter Item price</span>');
          err = true;
      }
      else if(negativePrice <= 0)
      {
          $('#inputItemPrice').after('<span class="error">Item Price should be greater than zero.</span>');
          err = true;
      }
      if (!err) {
          // if no error found during validation, then redirect
          // TODO: change this once server side code is ready
          window.location = "./ViewMenu.html";
      }
    });
  
  });

  function redirectToInvoice() {
    window.location.assign("../ViewMenu.html")
  }

