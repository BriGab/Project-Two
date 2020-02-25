$(document).ready(function(event){
    $("#submit").on("click", function(){
        const queryURL =  "https://ineedaprompt.com/dictionary/default/prompt?q=adj+noun+verb+noun+location"
    
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response)
            $("#box").text(JSON.stringify(response.english));
          });
    })
})