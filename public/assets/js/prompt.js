$(document).ready(function(event){
    $("#submit").on("click", function(){
        const promptSearch = "adj+noun+verb"
        const queryURL =  "http://ineedaprompt.com/dictionary/default/prompt?q=" + promptSearch
       
    
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            $("#box").text(JSON.stringify(response));
          });
    })
})