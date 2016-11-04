(function(){
  //On click listener for our login button
  $('#login-button').on('click',function(e){
    console.log('button clicked');
    event.preventDefault();
    window.location = '/app';
  });

  $('#save-btn').on('click', function(e){
    event.preventDefault();
    window.location = '/app';
  });

$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

})();
