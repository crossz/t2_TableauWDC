// Create event listeners for when the user submits the form
$(document).ready(function() {
    $("#submitButton").click(function() {
        console.log("It is working!");
        var userChoice = document.getElementById("dropDownListForApi").value;
        console.log(userChoice)
        app1();
    });
});
