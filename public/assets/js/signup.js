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
      if (!signUp.name.trim() || !signUp.username.trim() || !signUp.password.trim() || !signUp.email.trim()) {
        M.toast({html: "Please fill in missing fields"})
        return;
      } else if ((signUp.password.length < 6) || (signUp.username.length < 6)) {
        M.toast({html: "Username and password must be at least 6 characters"})
      }
      $.post("/api/users", signUp)
        .then(function (data) {
          console.log(signUp)
          window.location.replace("/")
        })
        .catch(function (err) {
          if (err) {
            M.toast({html: "Username is already in use please try again"})
          }
        })
  
    })
  })

