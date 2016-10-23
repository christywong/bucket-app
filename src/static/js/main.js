(function(){


  //On click listener for our login button
  $('#login-button').on('click',function(e){
    console.log('button clicked');
    event.preventDefault();
    window.location = '/home';
  });

  $('#btn-to-app').on('click',function(e){
    console.log('button clicked');
    event.preventDefault();
    window.location = '/app';
  });

})();
