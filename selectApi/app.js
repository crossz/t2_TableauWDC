$(document).ready(function() {
    $("#submitButton").click(function() {
        let userChoice = document.getElementById("dropDownListForApi").value;
        if (userChoice == "qPCR Repeat Case"){
            console.log("It is true");  
        } else {
            console.log("It is False"); 
        }
        
    });
});


