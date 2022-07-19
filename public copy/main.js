// Create the connector object
var myConnector = tableau.makeConnector();

$(document).ready(function() {
    $("#submitButton").click(function() {
        tableau.connectionName = "qPCRRepeatCase"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
        myConnector = app(myConnector);
        tableau.registerConnector(myConnector);
        tableau.connectionName = "qPCRRepeatCase"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
    });
});