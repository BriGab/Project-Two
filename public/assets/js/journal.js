$(document).ready(function () {
    $('.modal').modal();
    $('select').formSelect();
    $('#modal1').modal('open');

    //Page variables
    const titleInput = $("#title")
    const bodyInput = $("#body");
    const authId = $(".submit").data("authid");
    let mood;
    let moodnum;

    $("#mood").on("click", function (event) {
        // event.preventDefault();
        mood = $("#select-mood").val();
        moodnum = $("#select-mood").find(":selected").data("num");
        console.log(mood);
        console.log(moodnum);
    });
    $("#journal").on("submit", handleFormSubmit);

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        // Don't submit empty posts
        if (!titleInput.val().trim() || !bodyInput.val().trim()) {
            return;
        }
        // Constructing a newPost object to hand to the database
        var newPost = {
            title: titleInput
                .val()
                .trim(),
            body: bodyInput
                .val()
                .trim(),
            MoodId: moodnum,
            UserId: authId
            //Need to find a way to add in foreign key to posts
        };
        console.log(authId);
        console.log(newPost);
        submitPost(newPost);
    }

    // Submits a new post -- need to bring people to the journal page upon completion
    function submitPost(post) {
        $.post("/api/posts", post, function () {
            $.get("/api/user_data").then(function (data) {
                console.log(data.username);
                window.location.replace(`/${data.username}/posts`)
            });
        });
    }

    //Js to make textareas exapndable -- Targets all textareas with class "txta"
    let textareas = document.querySelectorAll('.txta'),
        hiddenDiv = document.createElement('div'),
        content = null;

    // Adds a class to all textareas
    for (let j of textareas) {
        j.classList.add('txtstuff');
    }

    // Build the hidden div's attributes

    // The line below is needed if you move the style lines to CSS
    // hiddenDiv.classList.add('hiddendiv');

    // Add the "txta" styles, which are common to both textarea and hiddendiv
    // If you want, you can remove those from CSS and add them via JS
    hiddenDiv.classList.add('txta');

    // Add the styles for the hidden div
    // These can be in the CSS, just remove these three lines and uncomment the CSS
    hiddenDiv.style.display = 'none';
    hiddenDiv.style.whiteSpace = 'pre-wrap';
    hiddenDiv.style.wordWrap = 'break-word';

    // Loop through all the textareas and add the event listener
    for (let i of textareas) {
        (function (i) {
            // Note: Use 'keyup' instead of 'input'
            // if you want older IE support
            i.addEventListener('input', function () {

                // Append hiddendiv to parent of textarea, so the size is correct
                i.parentNode.appendChild(hiddenDiv);

                // Remove this if you want the user to be able to resize it in modern browsers
                i.style.resize = 'none';

                // This removes scrollbars
                i.style.overflow = 'hidden';

                // Every input/change, grab the content
                content = i.value;

                // Add the same content to the hidden div

                // This is for old IE
                content = content.replace(/\n/g, '<br>');

                // The <br ..> part is for old IE
                // This also fixes the jumpy way the textarea grows if line-height isn't included
                hiddenDiv.innerHTML = content + '<br style="line-height: 3px;">';

                // Briefly make the hidden div block but invisible
                // This is in order to read the height
                hiddenDiv.style.visibility = 'hidden';
                hiddenDiv.style.display = 'block';
                i.style.height = hiddenDiv.offsetHeight + 'px';

                // Make the hidden div display:none again
                hiddenDiv.style.visibility = 'visible';
                hiddenDiv.style.display = 'none';
            });
        })(i);
    }


    //Redirects
    $(".journal-link").on("click", function (event) {
        event.preventDefault();
        $.get("/api/user_data").then(function (data) {
            console.log(data.username);
            window.location.replace(`/${data.username}/journal`)

        });
    });



    $(".post-link").on("click", function (event) {
        event.preventDefault();
        $.get("/api/user_data").then(function (data) {
            console.log(data.username);
            window.location.replace(`/${data.username}/posts`)

        });
    });
    $.get("/api/user_data").then(function (data) {
        console.log(data.username);
    });
    //Note Viewing Modal
    var $postTitle = $(".post-title");
    var $postText = $(".post-textarea");
    var $postList = $(".post-group");
    var $postDate = $(".dateCreated");
    let activePost = {};

    // Sets the activePost and displays it
    const handlePostView = function () {
        console.log("anything");
        activePost = $(this).data("num");
        console.log(activePost);
        // renderActiveNote();

        $.get("/api/posts/" + activePost).then(function (data) {
            console.log(data);
            $postTitle.val(data.title);
            $postText.val(data.body);
            $postDate.val(data.CreatedAt);
            $('#saving').attr("data-postid", data.id);
            $('#deleting').attr("data-postid", data.id);
            var testing = $('#deleting').data("postid");
            console.log("PostId: ", testing);
            if (data.Mood) {
                console.log(data.Mood.id);
                //remove selected one
                $('option:selected', 'select[name="mood-options"]').removeAttr('selected');
                //Using the value
                // $(`select[name="mood-options"]).find('option[value="${data.Mood.id}"]'`).attr("selected", true);
                const select = $('[name=mood-options]').val(data.Mood.id).attr('selected', 'selected');

                console.log(select);
                // $("#select-mood").val("default");
                // $("#select-mood").val(data.Mood.id);

                // $(`#select-mood option[value=default]`).attr('selected', 'deselected');
                // var display = $(`#select-mood option[value=${data.Mood.id}]`).attr('selected', 'selected');
                // console.log(display);
                // $("#select-mood").val(data.Mood.id).change();
            }
            $('#modal3').modal('open');
        });

    };

    $postList.on("click", ".post-list", handlePostView);

    $("#deleting").on("click", function () {
        event.preventDefault();
        var a = $('#deleting').data('postid');
        console.log(a);


        $.ajax({
            url: "/api/posts/" + a,
            method: 'DELETE',
            success: function (response) {
                console.log(response);
                // $('#modal3').modal('close');
                window.location.reload();
            }
        });

    });

    $("#saving").on("click", function () {
        event.preventDefault();
        console.log("clicked");
        var a = $('#saving').data('postid');
        console.log(a);
        console.log($postText);
        var postText = $postText[0].value;
        console.log("Post Text: ", postText);

        // Don't submit empty posts
        if (!postText.trim()) {
            return;
        }

        // Constructing a newPost object to hand to the database
        var newPost = {
            body: postText
        };
        console.log(newPost);

        $.ajax({
            url: "/api/posts/" + a,
            method: 'PUT',
            data: newPost,
            success: function (response) {
                console.log(response);
                // $('#modal3').modal('close');
                window.location.reload();
            }
        });
    });
});




