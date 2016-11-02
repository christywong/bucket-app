(function(){


  //On click listener for our login button
  $('#login-button').on('click',function(e){
    console.log('button clicked');
    event.preventDefault();
    window.location = '/app';
  });

  // $('#btn-to-app').on('click',function(e){
  //   console.log('button clicked');
  //   event.preventDefault();
  //   window.location = '/app';
  // });
  //check();

})();

// (function check(){/*function to check valid username & password*/
//   {
//     if (form.username.value ==""){
//      alert("Required field");
//       form.password.focus();
//       return false;
//         }
//     if (form.password.value ==""):
//       alert("Required field";
//         form.password.focus();
//         return false;
//         }
//     if (form.username.value == "user" && form.password.value == "pass")
//       window.location="/app";/*successfully logins into home page if login info matches */
//       }
//       else
//       {
//         alert("Invalid Password or Username") /* informs user of invalid login info*/
//       });
