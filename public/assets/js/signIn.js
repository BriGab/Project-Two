$(document).ready(function () {
    $("#submit").on("click", function (event) {
        event.preventDefault();
        const user = $("#username").val().trim();
        const password = $("#password").val().trim();
        signIn = {
            username: user,
            password: password
        }
        if (!signIn.username.trim() || !signIn.password.trim()) {
            alert("Please enter a valid username and password")
            return
        }
        $.post("api/login", signIn)
            .then(function (data) {
                console.log(signIn)
                window.location.replace(`/${user}/posts`)
            })
            .catch(function (err) {
                if (err.status = 401) {
                    alert("Login failed: Invalid username or password.")
                }
                console.log(err)
            });
    })
})