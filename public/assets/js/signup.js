$(document).ready(function () {
    $("#submit").on("click", function (event) {
      event.preventDefault();
      const email = $("#email").val().trim();
      const name = $("#name").val().trim();
      const userName = $("#username").val().trim();
      const password = $("#password").val().trim();
      signUp = {
        email: email,
        name: name,
        username: userName,
        password: password
      };
      console.log(signUp);
      if ((!signUp.name.trim() || !signUp.username.trim() || !signUp.password.trim()) ||
        (signUp.password.length < 6) || (signUp.username.length < 6)) {
        alert("Username must be at least 6 characters")
        return;
      }
      $.post("/api/users", signUp)
        .then(function (data) {
          console.log(signUp)
          window.location.replace(`/${userName}/posts`)
        })
        .catch(function (error) {
          console.error(error)
        })
  
    })
  })

