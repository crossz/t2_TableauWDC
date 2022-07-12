(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "batch_id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Operation",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "earthquakeFeed",
            alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://take2healthdataextractionapi.herokuapp.com/dataextraction", function(resp) {
            var table = resp.table,
                tableData = [],
                length = table.length;
            console log(length)
            console log(resp);
            console log("respon is okay")
            console log(table);
            
            // Iterate over the JSON object
            for (var i = 0, len = table.length; i < len; i++) {
                tableData.push({
                    "batch_id": table.batch_id[i],
                    "id": table.id[i],
                    "Operation": table.Operation[i],
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            console.log("It is working!");
            tableau.connectionName = "Peter Testing"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
