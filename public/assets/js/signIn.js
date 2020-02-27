$(document).ready(function(){
    $("#submit").on("click", function (event) {
        event.preventDefault();
        const user = $("#username").val().trim();
        const password = $("#password").val().trim();
        signIn = {
            username: user,
            password: password
        };
        if (!signIn.username.trim() || !signIn.password.trim()) {
            M.toast({ html: "Please fill out username and password fields" });
            return;
        }
        $.post("api/login", signIn)
            .then(function () {
                console.log(signIn);
                window.location.replace(`/${user}/posts`);
            })
            .catch(function (err) {
                if (err.status = 401) {
                    M.toast({ html: "Username or password not valid please try again" });
                }
                console.log(err);
            });
    });

});