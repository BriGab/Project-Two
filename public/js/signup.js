$(document).ready(function () {
  const $email = $("#email");
  const $name = $("#name");
  const $userName = $("#username");
  const $password = $("#password");
  let signUp = {};
  console.log(signUp);

  //function for saving a new users sign up information
  const saveUser = function(signUp) {
    return $.ajax({
      url: "/api/users",
      data: signUp,
      method: "POST"
    });
  };

  $("#submit").click(function(event){
    event.preventDefault();
    signUp = {
      email: $email.val(),
      name: $name.val(),
      username: $userName.val(),
      password: $password.val()
    };
    console.log(signUp);
    if ((!signUp.name.trim().trim() || !signUp.username.trim().trim() || !signUp.password.trim().trim()) ||
    (signUp.password.length < 6) || (signUp.username.length < 6)) {
      const box = $("<div>").addClass("textArea");
      $("#firstRow").append(box);
      $(".textArea").text("You must have at least 6 characters for both username and password, please try again.");
      return;
    } else {
      console.log(signUp);
      saveUser(signUp);
    }
  });
});