$(document).ready(function() {
    $("#submitButton").click(function() {
        let userChoice = document.getElementById("dropDownListForApi").value;
        if (userChoice == "qPCR Repeat Case"){
            qPCR();  
        } else {
            ngs(); 
        }
        
    });
});

