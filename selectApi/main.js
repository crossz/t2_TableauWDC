
// Create event listeners for when the user submits the form
console.log("start 1");
var myConnector = tableau.makeConnector();

(function (){
    $(document).ready(function() {
        $("#submitButton").click(function() {
            console.log("It is working!");
            var userChoice = document.getElementById("dropDownListForApi").value;
            console.log(userChoice);
            app1(myConnector);
        });
    });
})();
console.log("start 2");
