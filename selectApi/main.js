
// Create event listeners for when the user submits the form
console.log("start 1");
(function (){
    $(document).ready(function() {
        $("#submitButton").click(function() {
            console.log("It is working!");
            var userChoice = document.getElementById("dropDownListForApi").value;
            console.log(userChoice)
            app1();
        });
    });
})();
console.log("start 2");
