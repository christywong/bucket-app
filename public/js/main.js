(function(){
  //On click listener for our login button
  $('#login-button').on('click',function(e){
    console.log('button clicked');
    event.preventDefault();
    var username = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();

    if(username.length > 3 || password.length > 3){
      loginUser(username,password);
    }

  });

  $('#save-btn').on('click', function(e){
    event.preventDefault();
    window.location = '/app';
  });

$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

var loginUser = function(username,password){
  var me = this;
  var xhr = new XMLHttpRequest();
  var payload = 'username=' + username + '&password=' + password;
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        var result = xhr.response;
        console.log('result: ', result);
        if(result.found){
          localStorage.setItem('userGroupId', result.groupId);
          localStorage.setItem('memberId', result.memberId);
          localStorage.setItem('username', result.username);
          localStorage.setItem('firstTimeUser', result.firstTimeUser);
          window.location = '/app';
        }
        else{
          $('#errorMsg').show().text("Invalid Username/Password");
          console.log('incorrect credentials');
        }
      } else{
        console.log('Oops an error occurred');
      }
    }
  }

  xhr.open('POST', '/api/searchmember');
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.responseType = 'json'
  xhr.send(payload);
}

})();
